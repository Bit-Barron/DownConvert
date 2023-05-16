chrome.webRequest.onCompleted.addListener(
  (details) => {
    // const videoExtensions = [
    //   ".mp4",
    //   ".webm",
    //   ".mov",
    //   ".avi",
    //   ".wmv",
    //   ".flv",
    //   ".mkv",
    //   ".3gp",
    //   ".m4v",
    //   ".ogg",
    //   ".ogv",
    //   ".qt",
    //   ".vob",
    //   ".mpg",
    //   ".mpeg",
    //   ".m2v",
    //   ".mpv",
    //   ".m4p",
    //   ".m2ts",
    //   ".mts",
    //   ".ts",
    // ];

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
