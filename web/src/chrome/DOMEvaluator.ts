import { DOMMessage, DOMMessageResponse } from '../types';

chrome.webRequest.onResponseStarted.addListener(
  function (details) {
    console.log(details);
    console.log('details');
  },
  {
    urls: ['<all_urls>'],
  }
);
