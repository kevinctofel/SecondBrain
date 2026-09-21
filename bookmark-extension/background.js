importScripts("browser.js");

/**
 * SecondBrain Bookmarks — Service Worker
 *
 * Handles:
 *   - Context menu creation ("Save to Bookmarks" on right-click)
 *   - Save requests from the popup (markdown generation + GitHub push)
 *   - Settings persistence (token, repo, model)
 *
 * Uses the cross-browser `browser` namespace (see browser.js shim).
 * All state lives in browser.storage. The service worker is stateless
 * between invocations — every message re-reads what it needs.
 */

// ── Storage keys ──────────────────────────────────────────────────
const STORE_KEYS = {
  TOKEN: "ghToken",
  OWNER: "ghOwner",
  REPO: "ghRepo",
  MODEL: "aiModel",
  PROVIDER: "aiProvider", // "openai" | "anthropic" | "local"
  AI_KEY: "aiKey",
};

const DEFAULTS = {
  TOKEN: "",
  OWNER: "kevinctofel",
  REPO: "SecondBrain",
  MODEL: "gpt-4o-mini",
  PROVIDER: "openai",
};

// ── Context menu ──────────────────────────────────────────────────
browser.runtime.onInstalled.addListener(() => {
  browser.contextMenus.create({
    id: "save-to-bookmarks",
    title: "Save to Bookmarks",
    contexts: ["link", "page"],
  });
});

browser.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId !== "save-to-bookmarks") return;
  // Open the popup with the context pre-filled
  browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
    const tab = tabs[0];
    if (!tab) return;
    // We can't pre-fill the popup from a context menu click directly,
    // so we store the URL and the popup reads it on open.
    browser.storage.session.set({ contextUrl: info.linkUrl || info.pageUrl });
    // Open the action popup (programmatic open)
    browser.action.openPopup?.();
  }).catch(() => {});
});

// ── Message handler ───────────────────────────────────────────────
browser.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "SAVE_BOOKMARK") {
    handleSave(msg.payload)
      .then(sendResponse)
      .catch((err) => sendResponse({ ok: false, error: err.message }));
    return true; // async
  }

  if (msg.type === "FETCH_PAGE") {
    fetchPageContent(msg.url)
      .then((content) => sendResponse({ ok: true, content }))
      .catch((err) => sendResponse({ ok: false, error: err.message }));
    return true; // async
  }

  if (msg.type === "CHECK_SETTINGS") {
    browser.storage.local.get(Object.values(STORE_KEYS)).then((data) => {
      const tokenSet = !!data[STORE_KEYS.TOKEN];
      sendResponse({ tokenSet });
    });
    return true;
  }

  if (msg.type === "TEST_TOKEN") {
    browser.storage.local.get(["ghToken", "ghOwner", "ghRepo"]).then(async (data) => {
      const { ghToken, ghOwner = "kevinctofel", ghRepo = "SecondBrain" } = data;
      try {
        // Test 1: Is the token valid?
        const userRes = await fetch("https://api.github.com/user", {
          headers: {
            Authorization: `Bearer ${ghToken}`,
            Accept: "application/vnd.github+json",
          },
        });
        if (!userRes.ok) {
          const body = await userRes.text().catch(() => "");
          sendResponse({
            ok: false,
            stage: "token",
            status: userRes.status,
            error: `Token invalid — ${body.slice(0, 200)}`,
          });
          return;
        }
        const user = await userRes.json();

        // Test 2: Can the token access the repo?
        const repoRes = await fetch(
          `https://api.github.com/repos/${ghOwner}/${ghRepo}`,
          {
            headers: {
              Authorization: `Bearer ${ghToken}`,
              Accept: "application/vnd.github+json",
            },
          }
        );
        if (!repoRes.ok) {
          const body = await repoRes.text().catch(() => "");
          sendResponse({
            ok: false,
            stage: "repo",
            status: repoRes.status,
            error: `Token valid as ${user.login} but cannot access ${ghOwner}/${ghRepo} — ${body.slice(0, 200)}`,
          });
          return;
        }

        sendResponse({ ok: true, login: user.login, repo: `${ghOwner}/${ghRepo}` });
      } catch (e) {
        sendResponse({ ok: false, error: e.message });
      }
    });
    return true;
  }

  if (msg.type === "SAVE_SETTINGS") {
    browser.storage.local.set(msg.payload).then(() => {
      sendResponse({ ok: true });
    });
    return true;
  }
});

// ── Image handling ───────────────────────────────────────────────
const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2 MB

/**
 * Extract the best image URL from page HTML.
 * Priority: og:image → twitter:image → largest <img>
 */
function detectImageUrl(html) {
  if (!html) return null;

  // 1. og:image meta tag
  const ogMatch = html.match(
    /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i
  ) || html.match(
    /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i
  );
  if (ogMatch && ogMatch[1]) {
    return resolveUrl(ogMatch[1]);
  }

  // 2. twitter:image meta tag
  const twMatch = html.match(
    /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i
  ) || html.match(
    /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image["']/i
  );
  if (twMatch && twMatch[1]) {
    return resolveUrl(twMatch[1]);
  }

  // 3. Largest <img> by width×height (or first large one)
  const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  let best = null;
  let bestArea = 0;
  let m;
  while ((m = imgRegex.exec(html)) !== null) {
    const src = m[1];
    // Skip data URIs, SVGs, tracking pixels
    if (!src || src.startsWith("data:") || src.toLowerCase().endsWith(".svg")) continue;

    // Try to get width/height from attributes
    const tag = m[0];
    const w = parseInt(tag.match(/width=["'](\d+)/i)?.[1] || "0", 10);
    const h = parseInt(tag.match(/height=["'](\d+)/i)?.[1] || "0", 10);
    const area = w * h;

    // Prefer images with explicit dimensions; fall back to first image
    if (area > bestArea) {
      bestArea = area;
      best = src;
    } else if (!best) {
      best = src;
    }
  }

  return best ? resolveUrl(best) : null;
}

/**
 * Resolve a potentially-relative URL against the page URL.
 */
function resolveUrl(src, pageUrl) {
  if (!src) return null;
  try {
    // Already absolute
    if (/^https?:\/\//i.test(src)) return src;
    // Protocol-relative
    if (src.startsWith("//")) return "https:" + src;
    // Relative — resolve against page URL if provided
    if (pageUrl) {
      return new URL(src, pageUrl).href;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Download an image and return { base64, ext, size }.
 * Returns null if the image is too large or download fails.
 */
async function downloadImage(url) {
  console.log(`[IMG] Downloading: ${url}`);
  try {
    const res = await fetch(url, {
      headers: { "Accept": "image/*" },
    });
    if (!res.ok) {
      console.warn(`[IMG] HTTP ${res.status} for image`);
      return null;
    }

    const contentType = res.headers.get("Content-Type") || "";
    const blob = await res.blob();
    const size = blob.size;

    if (size > MAX_IMAGE_SIZE) {
      console.warn(`[IMG] Image too large: ${size} bytes (max ${MAX_IMAGE_SIZE})`);
      return null;
    }

    // Determine extension from Content-Type
    const extMap = {
      "image/jpeg": "jpg",
      "image/png": "png",
      "image/gif": "gif",
      "image/webp": "webp",
      "image/bmp": "bmp",
    };
    const ext = extMap[contentType.split(";")[0].trim()] || "jpg";

    // Convert blob to base64
    const buffer = await blob.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    let binary = "";
    const chunkSize = 8192;
    for (let i = 0; i < bytes.length; i += chunkSize) {
      binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
    }
    const base64 = btoa(binary);

    console.log(`[IMG] Downloaded: ${size} bytes, type=${contentType}, ext=${ext}`);
    return { base64, ext, size };
  } catch (e) {
    console.warn(`[IMG] Download failed: ${e.message}`);
    return null;
  }
}

/**
 * Upload an image to the repo under Images/bookmarks/.
 * Returns the repo-relative path (e.g. "/Images/bookmarks/2026-09-21-slug.jpg")
 * or null if upload fails.
 */
async function uploadImage(settings, base64, ext, date, slug) {
  const { ghOwner: OWNER, ghRepo: REPO } = settings;
  const imgPath = `Images/bookmarks/${date}-${slug}.${ext}`;

  console.log(`[IMG] Uploading to: ${imgPath}`);

  try {
    // Try to create; if it exists, it's already there — reuse the path
    const result = await ghFetch(settings, `/contents/${imgPath}`, {
      method: "PUT",
      body: JSON.stringify({
        message: `Add bookmark image: ${date}-${slug}.${ext}`,
        content: base64,
        branch: "main",
      }),
    });
    console.log(`[IMG] Upload success: ${result.content?.path}`);
    return `/Images/bookmarks/${date}-${slug}.${ext}`;
  } catch (e) {
    if (e.message.includes("409")) {
      // File already exists — reuse it
      console.log(`[IMG] File already exists, reusing: ${imgPath}`);
      return `/Images/bookmarks/${date}-${slug}.${ext}`;
    }
    console.warn(`[IMG] Upload failed: ${e.message}`);
    return null;
  }
}

// ── Core save logic ───────────────────────────────────────────────
async function handleSave(payload) {
  const { title, url, pageContent } = payload;
  const settings = await getSettings();

  if (!settings[STORE_KEYS.TOKEN]) {
    throw new Error("GitHub token not set. Open settings (gear icon in popup).");
  }

  // 1. Generate summary
  const summary = await generateSummary(title, url, pageContent, settings);

  // 2. Detect and download image
  const date = new Date().toISOString().slice(0, 10);
  const slug = slugify(title);
  const imgUrl = detectImageUrl(pageContent, url);
  let imagePath = null;

  if (imgUrl) {
    console.log(`[IMG] Detected: ${imgUrl}`);
    const imgData = await downloadImage(imgUrl);
    if (imgData) {
      imagePath = await uploadImage(settings, imgData.base64, imgData.ext, date, slug);
      if (!imagePath) {
        console.warn("[IMG] Upload failed, continuing without image");
      }
    }
  } else {
    console.log("[IMG] No image detected");
  }

  // 3. Build markdown
  const fileName = `${date}-${slug}.md`;
  const filePath = `Bookmarks/${fileName}`;
  const markdown = buildMarkdown(title, url, date, summary, imagePath);

  // 4. Dedup check
  const existing = await checkExisting(filePath, settings);
  if (existing) {
    return { ok: true, dedup: true, url: existing.html_url };
  }

  // 5. Push to GitHub
  const commitInfo = await pushToGitHub(filePath, markdown, settings, title);

  return {
    ok: true,
    dedup: false,
    fileName,
    commitUrl: commitInfo.html_url,
    imagePath,
  };
}

// ── Settings ──────────────────────────────────────────────────────
async function getSettings() {
  const keys = Object.values(STORE_KEYS);
  return browser.storage.local.get(keys);
}

// ── GitHub API ────────────────────────────────────────────────────
const GH_API = "https://api.github.com";

async function ghFetch(settings, path, opts = {}) {
  const { ghToken: TOKEN, ghOwner: OWNER, ghRepo: REPO } = settings;
  const url = path.startsWith("http") ? path : `${GH_API}/repos/${OWNER}/${REPO}${path}`;
  const headers = {
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
    Accept: "application/vnd.github+json",
    ...(opts.headers || {}),
  };

  // Log the request for debugging
  console.log(`[GH] ${opts.method || "GET"} ${url}`);
  console.log(`[GH] Auth header: Bearer ${TOKEN.slice(0, 10)}…${TOKEN.slice(-8)} (len=${TOKEN.length})`);
  if (opts.body) {
    console.log(`[GH] Body size: ${opts.body.length} bytes`);
  }

  const res = await fetch(url, {
    ...opts,
    headers,
  });

  console.log(`[GH] Response: HTTP ${res.status} ${res.statusText}`);

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    console.error(`[GH] Error body: ${body.slice(0, 300)}`);
    throw new Error(`GitHub API ${res.status}: ${res.statusText} — ${body.slice(0, 200)}`);
  }
  return res.json();
}

/**
 * Check if a file already exists at the given path.
 * Returns the file API object (with html_url) or null.
 */
async function checkExisting(filePath, settings) {
  try {
    return await ghFetch(settings, `/contents/${filePath}`);
  } catch (e) {
    if (e.message.includes("404")) return null;
    throw e;
  }
}

/**
 * Create a file (or update if it exists) and commit.
 * Returns the commit API object.
 */
async function pushToGitHub(filePath, content, settings, title) {
  const { ghToken: TOKEN, ghOwner: OWNER, ghRepo: REPO } = settings;
  const commitMsg = `Add bookmark: ${title}`;

  // Try to create; if it exists (race condition), update instead
  try {
    return await ghFetch(settings, `/contents/${filePath}`, {
      method: "PUT",
      body: JSON.stringify({
        message: commitMsg,
        content: btoa(unescape(encodeURIComponent(content))),
        branch: "main",
      }),
    });
  } catch (e) {
    if (!e.message.includes("409")) throw e;
    // File exists — get sha then update
    const existing = await ghFetch(settings, `/contents/${filePath}`);
    return await ghFetch(settings, `/contents/${filePath}`, {
      method: "PUT",
      body: JSON.stringify({
        message: `Update bookmark: ${title}`,
        content: btoa(unescape(encodeURIComponent(content))),
        sha: existing.sha,
        branch: "main",
      }),
    });
  }
}

// ── Summary generation ────────────────────────────────────────────
async function generateSummary(title, url, content, settings) {
  const { aiProvider: PROVIDER, aiModel: MODEL, aiKey: AI_KEY } = settings;

  // Extract readable text from HTML (strip tags, collapse whitespace)
  const text = extractText(content).slice(0, 8000);

  if (!text.trim()) {
    return "No readable content extracted.";
  }

  const prompt = [
    `Summarize the following web page in 2-3 sentences.`,
    `Title: ${title}`,
    `URL: ${url}`,
    ``,
    `Content:`,
    text,
  ].join("\n");

  if (PROVIDER === "openai") {
    return callOpenAI(prompt, MODEL, AI_KEY);
  }

  if (PROVIDER === "anthropic") {
    return callAnthropic(prompt, MODEL, AI_KEY);
  }

  // Fallback: no AI, just truncate
  return text.slice(0, 300).trim() + (text.length > 300 ? "…" : "");
}

async function callOpenAI(prompt, model, token) {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: [{ role: "user", content: prompt }],
      max_tokens: 150,
      temperature: 0.3,
    }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`OpenAI ${res.status}: ${body.slice(0, 200)}`);
  }
  const data = await res.json();
  return data.choices[0]?.message?.content?.trim() || "(no summary)";
}

async function callAnthropic(prompt, model, token) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": token,
      "anthropic-version": "2023-06-01",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      max_tokens: 150,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Anthropic ${res.status}: ${body.slice(0, 200)}`);
  }
  const data = await res.json();
  return data.content?.[0]?.text?.trim() || "(no summary)";
}

// ── Markdown builder ──────────────────────────────────────────────
function buildMarkdown(title, url, date, summary, imagePath) {
  const escapedTitle = title.replace(/"/g, '\\"');
  const lines = [
    "---",
    `title: "${escapedTitle}"`,
    `url: "${url}"`,
    `date: "${date}"`,
    `summary: "${summary.replace(/"/g, '\\"')}"`,
  ];

  if (imagePath) {
    lines.push(`image: "${imagePath}"`);
  }

  lines.push(
    "tags: [bookmarks]",
    "---",
    "",
  );

  if (imagePath) {
    lines.push(`![](${imagePath})`, "");
  }

  lines.push(
    `**Source:** <${url}>`,
    "",
    summary,
  );

  return lines.join("\n");
}

// ── Page content fetch ───────────────────────────────────────────
async function fetchPageContent(url) {
  const res = await fetch(url, {
    headers: {
      "Accept": "text/html,application/xhtml+xml",
    },
  });
  if (!res.ok) {
    throw new Error(`Could not fetch page: ${res.status} ${res.statusText}`);
  }
  return res.text();
}

// ── Utils ─────────────────────────────────────────────────────────
function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "") // strip accents
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}

/**
 * Strip HTML tags and extract readable text.
 * Works in the service worker context (no DOM available).
 */
function extractText(html) {
  if (!html) return "";
  let text = html;

  // Remove script, style, noscript blocks
  text = text.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, " ");
  text = text.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, " ");
  text = text.replace(/<noscript[^>]*>[\s\S]*?<\/noscript>/gi, " ");

  // Remove nav, footer, header, aside, form, button, iframe, svg
  text = text.replace(/<(nav|footer|header|aside|form|button|iframe|svg|header)[^>]*>[\s\S]*?<\/\1>/gi, " ");

  // Remove HTML comments
  text = text.replace(/<!--[\s\S]*?-->/g, " ");

  // Remove all remaining tags
  text = text.replace(/<[^>]+>/g, " ");

  // Decode common HTML entities
  text = text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, " ");

  // Collapse whitespace
  return text.replace(/\s+/g, " ").trim();
}
