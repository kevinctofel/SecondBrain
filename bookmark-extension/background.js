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

// ── Core save logic ───────────────────────────────────────────────
async function handleSave(payload) {
  const { title, url, pageContent } = payload;
  const settings = await getSettings();

  if (!settings[STORE_KEYS.TOKEN]) {
    throw new Error("GitHub token not set. Open settings (gear icon in popup).");
  }

  // 1. Generate summary
  const summary = await generateSummary(title, url, pageContent, settings);

  // 2. Build markdown
  const date = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const slug = slugify(title);
  const fileName = `${date}-${slug}.md`;
  const filePath = `Bookmarks/${fileName}`;

  const markdown = buildMarkdown(title, url, date, summary);

  // 3. Dedup check
  const existing = await checkExisting(filePath, settings);
  if (existing) {
    return { ok: true, dedup: true, url: existing.html_url };
  }

  // 4. Push to GitHub
  const commitInfo = await pushToGitHub(filePath, markdown, settings, title);

  return {
    ok: true,
    dedup: false,
    fileName,
    commitUrl: commitInfo.html_url,
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
  const { TOKEN, OWNER, REPO } = settings;
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
  const { TOKEN, OWNER, REPO } = settings;
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
  const { PROVIDER, MODEL, TOKEN } = settings;

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
    return callOpenAI(prompt, MODEL, TOKEN);
  }

  if (PROVIDER === "anthropic") {
    return callAnthropic(prompt, MODEL, TOKEN);
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
function buildMarkdown(title, url, date, summary) {
  const escapedTitle = title.replace(/"/g, '\\"');
  return [
    "---",
    `title: "${escapedTitle}"`,
    `url: "${url}"`,
    `date: "${date}"`,
    `summary: "${summary.replace(/"/g, '\\"')}"`,
    `tags: [bookmarks]`,
    "---",
    "",
    `**Source:** <${url}>`,
    "",
    summary,
  ].join("\n");
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
