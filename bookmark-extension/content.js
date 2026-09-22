/**
 * SecondBrain Bookmarks — Content Script
 *
 * Runs in the page context (no CORS restrictions).
 * Extracts readable text, article date, and image URL from the DOM.
 * Responds to messages from the service worker.
 */

browser.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "EXTRACT_PAGE") {
    const content = extractReadableText();
    const imageUrl = detectImageUrl();
    const articleDate = detectArticleDate();
    sendResponse({ ok: true, content, imageUrl, articleDate });
    return;
  }
});

/**
 * Extract readable text from the page DOM.
 * Prefers <article> content; falls back to <main>; then <body>.
 */
function extractReadableText() {
  // Priority: <article> → <main> → <body>
  let root = document.querySelector("article")
    || document.querySelector("main")
    || document.body;

  if (!root) return "";

  // Clone to avoid mutating the live DOM
  const clone = root.cloneNode(true);

  // Remove scripts, styles, nav, footer, header, aside, forms, iframes, SVGs
  const removeTags = clone.querySelectorAll(
    "script, style, noscript, nav, footer, header, aside, form, button, iframe, svg, noscript"
  );
  removeTags.forEach((el) => el.remove());

  // Remove HTML comments
  const walker = document.createTreeWalker(clone, NodeFilter.SHOW_COMMENT);
  const comments = [];
  while (walker.nextNode()) comments.push(walker.currentNode);
  comments.forEach((c) => c.parentNode.removeChild(c));

  // Get text, collapse whitespace
  let text = clone.textContent || "";
  return text.replace(/\s+/g, " ").trim();
}

/**
 * Detect the best image URL from the page.
 * Priority: og:image → twitter:image → largest <img>.
 */
function detectImageUrl() {
  // 1. og:image meta tag
  const og = document.querySelector('meta[property="og:image"], meta[name="og:image"]');
  if (og && og.content) return resolveUrl(og.content);

  // 2. twitter:image meta tag
  const tw = document.querySelector('meta[name="twitter:image"]');
  if (tw && tw.content) return resolveUrl(tw.content);

  // 3. Largest <img> by width×height
  const imgs = document.querySelectorAll("img");
  let best = null;
  let bestArea = 0;
  for (const img of imgs) {
    const src = img.src || img.getAttribute("src") || "";
    if (!src || src.startsWith("data:") || src.toLowerCase().endsWith(".svg")) continue;
    const w = img.naturalWidth || img.width || 0;
    const h = img.naturalHeight || img.height || 0;
    const area = w * h;
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
 * Detect the article publication date.
 * Priority: article:published_time → JSON-LD → <time> → date-stamped URL.
 */
function detectArticleDate() {
  // 1. article:published_time meta tag
  const meta = document.querySelector('meta[property="article:published_time"]');
  if (meta && meta.content) {
    const d = new Date(meta.content);
    if (!isNaN(d.getTime())) return d.toISOString().slice(0, 10);
  }

  // 2. JSON-LD datePublished
  const scripts = document.querySelectorAll('script[type="application/ld+json"]');
  for (const s of scripts) {
    try {
      const data = JSON.parse(s.textContent);
      const items = Array.isArray(data) ? data : [data];
      for (const item of items) {
        const dateStr = item.datePublished || item.dateCreated;
        if (dateStr) {
          const d = new Date(dateStr);
          if (!isNaN(d.getTime())) return d.toISOString().slice(0, 10);
        }
      }
    } catch { /* not valid JSON */ }
  }

  // 3. <time> tag with datetime attribute
  const time = document.querySelector("time[datetime]");
  if (time && time.getAttribute("datetime")) {
    const d = new Date(time.getAttribute("datetime"));
    if (!isNaN(d.getTime())) return d.toISOString().slice(0, 10);
  }

  // 4. Date-stamped URL
  const url = window.location.href;
  const urlDate = url.match(/(\d{4})-?(\d{2})-?(\d{2})/);
  if (urlDate) {
    return `${urlDate[1]}-${urlDate[2]}-${urlDate[3]}`;
  }

  return null;
}

/**
 * Resolve a potentially-relative URL.
 */
function resolveUrl(src) {
  if (!src) return null;
  try {
    if (/^https?:\/\//i.test(src)) return src;
    if (src.startsWith("//")) return "https:" + src;
    return new URL(src, window.location.href).href;
  } catch {
    return null;
  }
}
