import { DOMMessage, DOMMessageResponse } from '../types';

chrome.webRequest.onCompleted.addListener(
  (details) => {
    console.log(details.responseHeaders);
  },
  { urls: ['<all_urls>'] },
  ['responseHeaders', 'extraHeaders']
);
