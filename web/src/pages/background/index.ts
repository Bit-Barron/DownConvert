chrome.webRequest.onCompleted.addListener(
  (details) => {
    console.log(details);
  },
  { urls: ["<all_urls>"] }
);
