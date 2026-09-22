/**
 * SecondBrain Bookmarks — Content Script
 *
 * Runs in the page context (no CORS restrictions).
 * Sends the page's raw HTML to the service worker.
 *
 * Uses `chrome` directly (content scripts don't have the
 * `browser` polyfill from browser.js).
 */

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type !== "EXTRACT_PAGE") return;

  try {
    const html = document.documentElement.outerHTML;
    sendResponse({ ok: true, content: html });
  } catch (e) {
    sendResponse({ ok: false, error: e.message });
  }
  return true; // async
});