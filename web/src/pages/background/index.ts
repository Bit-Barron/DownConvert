chrome.webRequest.onCompleted.addListener(
  (details) => {
    // console.log(details);
    // self.dispatchEvent(new CustomEvent("webRequest", { detail: details }));

    chrome.runtime.sendMessage({
      msg: "webRequest",
      data: details,
    });
  },
  { urls: ["<all_urls>"] }
);
