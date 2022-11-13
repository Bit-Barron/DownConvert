chrome.webRequest.onCompleted.addListener(
  (details) => {
    chrome.storage.local.set({ [`${details.timeStamp}`]: details });

    // chrome.runtime.sendMessage({
    //   msg: "webRequest",
    //   data: details,
    // });
  },
  { urls: ["<all_urls>"] }
);
