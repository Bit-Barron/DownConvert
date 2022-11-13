export {};

chrome.webRequest.onCompleted.addListener(
  (details) =>
    document.dispatchEvent(new CustomEvent('webRequest', { detail: details })),
  { urls: ['<all_urls>'] },
  ['responseHeaders', 'extraHeaders']
);
