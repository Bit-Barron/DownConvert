import { DOMMessage, DOMMessageResponse } from '../types';
import { httpTracker } from './httpTrackerConstant';

const messagesFromReactAppListener = (
  msg: DOMMessage,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response: DOMMessageResponse) => void
) => {
  console.log('[content.js]. Message received', msg);

  const response: DOMMessageResponse = {
    title: document.title,
    headlines: Array.from(document.getElementsByTagName<'h1'>('h1')).map(
      (h1) => h1.innerText
    ),
    images: Array.from(document.getElementsByTagName<'img'>('img')).map(
      (image) => image.src
    ),
  };

  const trackUrls = {
    urls: ['<all_urls>'],
  };
  // !IMPORTANT
  const reqBodyHeaders = httpTracker.isFF
    ? ['requestBody']
    : ['requestBody', 'extraHeaders'];
  const reqHeaders = httpTracker.isFF
    ? ['requestHeaders']
    : ['requestHeaders', 'extraHeaders'];
  const reqHeadersBlocking = httpTracker.isFF
    ? ['blocking', 'requestHeaders']
    : ['blocking', 'requestHeaders', 'extraHeaders'];
  const resHeaders = httpTracker.isFF
    ? ['responseHeaders']
    : ['responseHeaders', 'extraHeaders'];
  const errorHeaders = ['extraHeaders'];

  const r = httpTracker.browser.webRequest;
  r.onCompleted.addListener(
    function (details: any) {
      details.callerName = 'onCompleted';
      details.requestIdEnhanced = details.requestId;
      console.log(details);
    },
    trackUrls,
    resHeaders
  );
  console.log(resHeaders);

  console.log('[content.js]. Message response', resHeaders);

  sendResponse(response);
};

chrome.runtime.onMessage.addListener(messagesFromReactAppListener);

chrome.webRequest.onResponseStarted.addListener(
  function (details) {
    console.log(details);
    console.log('details');
  },
  {
    urls: ['<all_urls>'],
  }
);
