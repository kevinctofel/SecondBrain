/**
 * SecondBrain Bookmarks — Content Script
 *
 * Runs in the page context (no CORS restrictions).
 * Sends the page's raw HTML to the service worker, which runs
 * extractText, detectImageUrl, detectArticleDate on it.
 *
 * Responds to messages from background.js (EXTRACT_PAGE).
 */

browser.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type !== "EXTRACT_PAGE") return;

  try {
    const html = document.documentElement.outerHTML;
    sendResponse({ ok: true, content: html });
  } catch (e) {
    sendResponse({ ok: false, error: e.message });
  }
  return true; // async
});