/**
 * SecondBrain Bookmarks — Popup Script
 *
 * Reads the active tab, auto-fills title/URL, fetches page content,
 * and sends save requests to the service worker.
 */

// ── DOM refs ──────────────────────────────────────────────────────
const $ = (sel) => document.querySelector(sel);

const titleInput = $("#title");
const urlInput = $("#url");
const contentInput = $("#content");
const btnFetch = $("#btnFetch");
const btnSave = $("#btnSave");
const btnSaveText = $("#btnSaveText");
const statusEl = $("#status");
const tokenWarning = $("#tokenWarning");

const settingsPanel = $("#settingsPanel");
const saveForm = $("#saveForm");
const btnSettings = $("#btnSettings");
const btnCloseSettings = $("#btnCloseSettings");
const btnTestToken = $("#btnTestToken");
const statusSettings = $("#statusSettings");

// Settings inputs
const setOwner = $("#setOwner");
const setRepo = $("#setRepo");
const setToken = $("#setToken");
const setProvider = $("#setProvider");
const setModel = $("#setModel");

// ── Init: fill from active tab ───────────────────────────────────
async function init() {
  // Check if a token is set
  const res = await browser.runtime.sendMessage({ type: "CHECK_SETTINGS" });
  if (!res.tokenSet) {
    tokenWarning.classList.add("visible");
  }

  // Try to pick up a URL from a context menu click
  const sessionData = await browser.storage.session.get("contextUrl");
  const contextUrl = sessionData.contextUrl;
  if (contextUrl) {
    browser.storage.session.remove("contextUrl");
  }

  const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
  if (!tab) return;

  const url = contextUrl || tab.url;
  titleInput.value = tab.title || "";
  urlInput.value = url || "";

  // Auto-fetch page content
  if (tab.url && !tab.url.startsWith("chrome")) {
    await fetchContent(tab.id, url);
  }
}

// ── Fetch page content ───────────────────────────────────────────
async function fetchContent(tabId, url) {
  btnFetch.disabled = true;
  btnFetch.textContent = "…";

  try {
    const res = await fetchWithTab(tabId, url);
    contentInput.value = res;
  } catch (err) {
    console.warn("Could not fetch page content:", err.message);
    contentInput.placeholder = "Could not auto-fetch. Paste content or leave blank.";
  }

  btnFetch.disabled = false;
  btnFetch.textContent = "Fetch";
}

async function fetchWithTab(tabId, url) {
  // Use the tab's fetch context via the service worker
  // (service worker has the page's origin context)
  const resp = await browser.runtime.sendMessage({ type: "FETCH_PAGE", url });
  if (!resp?.ok) throw new Error(resp?.error || "Fetch failed");
  return resp.content;
}

// ── Save ─────────────────────────────────────────────────────────
btnSave.addEventListener("click", async () => {
  const title = titleInput.value.trim();
  const url = urlInput.value.trim();
  const content = contentInput.value;

  if (!title) {
    showStatus("error", "Title is required.");
    return;
  }
  if (!url) {
    showStatus("error", "URL is required.");
    return;
  }

  // Disable button + show spinner
  btnSave.disabled = true;
  btnSaveText.innerHTML = '<span class="spinner"></span> Saving…';
  statusEl.className = "status";
  statusEl.textContent = "";

  try {
    const resp = await browser.runtime.sendMessage({
      type: "SAVE_BOOKMARK",
      payload: { title, url, pageContent: content },
    });

    if (resp.ok && resp.dedup) {
      showStatus("success", `Already bookmarked. <a href="${resp.url}" target="_blank">View on GitHub</a>`);
    } else if (resp.ok) {
      showStatus(
        "success",
        `Saved "${title}". <a href="${resp.commitUrl}" target="_blank">View commit</a>`
      );
    } else {
      showStatus("error", resp.error || "Save failed.");
    }
  } catch (err) {
    showStatus("error", err.message);
  }

  btnSave.disabled = false;
  btnSaveText.textContent = "Save Bookmark";
});

// ── Fetch button ─────────────────────────────────────────────────
btnFetch.addEventListener("click", async () => {
  const url = urlInput.value.trim();
  if (!url) return;

  const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
  if (!tab) return;

  await fetchContent(tab.id, url);
});

// ── Settings ─────────────────────────────────────────────────────
btnSettings.addEventListener("click", async () => {
  const data = await browser.storage.local.get([
    "ghToken",
    "ghOwner",
    "ghRepo",
    "aiModel",
    "aiProvider",
  ]);

  setOwner.value = data.ghOwner || "kevinctofel";
  setRepo.value = data.ghRepo || "SecondBrain";
  setToken.value = data.ghToken || "";
  setProvider.value = data.aiProvider || "openai";
  setModel.value = data.aiModel || "gpt-4o-mini";

  saveForm.style.display = "none";
  settingsPanel.classList.add("visible");
});

btnCloseSettings.addEventListener("click", async () => {
  await browser.storage.local.set({
    ghOwner: setOwner.value.trim() || "kevinctofel",
    ghRepo: setRepo.value.trim() || "SecondBrain",
    ghToken: setToken.value.trim(),
    aiProvider: setProvider.value,
    aiModel: setModel.value.trim() || "gpt-4o-mini",
  });

  statusSettings.className = "status visible success";
  statusSettings.textContent = "Settings saved.";

  setTimeout(() => {
    statusSettings.className = "status";
    settingsPanel.classList.remove("visible");
    saveForm.style.display = "flex";

    // Re-check token warning
    browser.runtime.sendMessage({ type: "CHECK_SETTINGS" })
      .then((res) => {
        tokenWarning.classList.toggle("visible", !res.tokenSet);
      })
      .catch(() => {});
  }, 1200);
});

btnTestToken.addEventListener("click", async () => {
  // Save the current token first (in case they haven't clicked Done yet)
  await browser.storage.local.set({
    ghToken: setToken.value.trim(),
  });

  statusSettings.className = "status visible info";
  statusSettings.textContent = "Testing token…";

  const resp = await browser.runtime.sendMessage({ type: "TEST_TOKEN" });

  if (resp.ok) {
    statusSettings.className = "status visible success";
    statusSettings.textContent = `✓ Token valid — logged in as ${resp.login}`;
  } else {
    statusSettings.className = "status visible error";
    statusSettings.textContent = `✗ Token rejected (HTTP ${resp.status || "?"}): ${resp.error || resp.message || "Unknown error"}`;
  }
});

// ── Helpers ──────────────────────────────────────────────────────
function showStatus(type, html) {
  statusEl.className = `status visible ${type}`;
  statusEl.innerHTML = html;
}

// ── Go ───────────────────────────────────────────────────────────
init();
