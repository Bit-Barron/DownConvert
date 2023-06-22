chrome.webRequest.onCompleted.addListener(
  (details) => {
    chrome.storage.local.set({ [`${details.timeStamp}`]: details });
  },
  { urls: ["<all_urls>"] },
  ["responseHeaders", "extraHeaders"]
);
chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    chrome.storage.local.set({ [`${details.timeStamp}`]: details });
  },
  { urls: ["<all_urls>"] },
  []
);
