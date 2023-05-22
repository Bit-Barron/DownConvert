chrome.webRequest.onCompleted.addListener(
  (details) => {
    console.log(details.url);
    chrome.storage.local.set({ [`${details.timeStamp}`]: details });
  },
  { urls: ["<all_urls>"] },
  ["responseHeaders", "extraHeaders"]
);
chrome.storage.local.clear(function () {
  const error = chrome.runtime.lastError;
  if (error) {
    console.error(error);
  }
  // do something more
});
