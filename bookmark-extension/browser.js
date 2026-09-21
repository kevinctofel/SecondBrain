/**
 * Cross-browser API shim.
 *
 * Safari and Firefox expose WebExtensions APIs under `browser.*`
 * (Promise-based). Chromium exposes them under `chrome.*`
 * (callback-based). This shim normalises to a single Promise-based
 * `browser` namespace so the rest of the extension is browser-agnostic.
 *
 * On Safari the native `browser` global already exists — we just
 * re-export it. On Chromium we wrap `chrome` in a thin Promise adapter.
 */

if (typeof browser !== "undefined") {
  // Safari / Firefox — already Promise-based
  // nothing to do; `browser` is available as a global
} else {
  // Chromium — wrap chrome in Promise-ified `browser`
  const _chrome = chrome;

  function promisify(api) {
    return (...args) =>
      new Promise((resolve, reject) => {
        try {
          const result = api(...args, (res) => {
            if (_chrome.runtime.lastError) {
              reject(new Error(_chrome.runtime.lastError.message));
            } else {
              resolve(res);
            }
          });
          // Some APIs return a value synchronously (e.g. contextMenus.create)
          if (result !== undefined && typeof result.then !== "function") {
            // Check if lastError was set synchronously
            if (_chrome.runtime.lastError) {
              reject(new Error(_chrome.runtime.lastError.message));
            } else {
              resolve(result);
            }
          }
        } catch (e) {
          reject(e);
        }
      });
  }

  const browser = {
    runtime: {
      onInstalled: _chrome.runtime.onInstalled,
      onMessage: _chrome.runtime.onMessage,
      sendMessage: promisify(_chrome.runtime.sendMessage),
      lastError: _chrome.runtime.lastError,
    },
    tabs: {
      query: promisify(_chrome.tabs.query),
      create: promisify(_chrome.tabs.create),
    },
    storage: {
      local: {
        get: promisify(_chrome.storage.local.get),
        set: promisify(_chrome.storage.local.set),
        remove: promisify(_chrome.storage.local.remove),
      },
      session: {
        get: promisify(_chrome.storage.session.get),
        set: promisify(_chrome.storage.session.set),
        remove: promisify(_chrome.storage.session.remove),
      },
    },
    contextMenus: {
      create: promisify(_chrome.contextMenus.create),
      onClicked: _chrome.contextMenus.onClicked,
    },
    action: {
      openPopup: _chrome.action?.openPopup
        ? promisify(_chrome.action.openPopup)
        : undefined,
    },
  };
}
