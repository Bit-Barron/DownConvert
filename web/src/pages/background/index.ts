chrome.webRequest.onCompleted.addListener(
  (details) => {
    console.log(details);

    chrome.storage.local.set({ [`${details.timeStamp}`]: details });

    // chrome.runtime.sendMessage({
    //   msg: "webRequest",
    //   data: details,
    // });
  },
  { urls: ["<all_urls>"] }
);
// chrome.storage.local.clear(function () {
//   var error = chrome.runtime.lastError;
//   if (error) {
//     console.error(error);
//   }
//   // do something more
// });
