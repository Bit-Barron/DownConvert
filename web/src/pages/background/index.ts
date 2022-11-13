import reloadOnUpdate from "virtual:reload-on-update-in-background-script";

reloadOnUpdate("pages/background");

console.log("background script loaded");

chrome.webRequest.onCompleted.addListener(
  (details) => {
    console.log(details);
  },
  { urls: ["<all_urls>"] }
);
