import { DOMMessage, DOMMessageResponse } from '../types';
import { httpTracker } from './httpTrackerConstant';

const messagesFromReactAppListener = (
  msg: DOMMessage,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response: DOMMessageResponse) => void
) => {
  const response: DOMMessageResponse = {
    title: document.title,
    headlines: Array.from(document.getElementsByTagName<'h1'>('h1')).map(
      (h1) => h1.innerText
    ),
    images: Array.from(document.getElementsByTagName<'img'>('img')).map(
      (image) => image.src
    ),
  };

  sendResponse(response);
};

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

const trackUrls = {
  urls: ['<all_urls>'],
};

const r = chrome.webRequest;
r.onCompleted.addListener(
  // @ts-ignore
  function (details: {
    callerName: string;
    requestIdEnhanced: any;
    requestId: any;
  }) {
    details.callerName = 'onCompleted';
    details.requestIdEnhanced = details.requestId;
    console.log(details);
  },
  trackUrls,
  resHeaders
);
console.log(resHeaders, trackUrls);

chrome.runtime.onMessage.addListener(messagesFromReactAppListener);

chrome.webRequest.onResponseStarted.addListener(
  function (details) {
    console.log('details');
  },
  {
    urls: ['<all_urls>'],
  }
);
