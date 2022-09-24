import { DOMMessage, DOMMessageResponse } from '../types';

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
    images: Array.from (document.getElementsByTagName<'img'>('img')).map(
      (image) => image.src
    )
  };

  console.log('[content.js]. Message response', response);

  sendResponse(response);
};
  
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
