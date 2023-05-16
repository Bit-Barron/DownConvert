interface Image {
  url: string;
  headers: chrome.webRequest.HttpHeader[];
  lastModified: chrome.webRequest.HttpHeader;
  format: chrome.webRequest.HttpHeader;
  date: chrome.webRequest.HttpHeader;
  expires: chrome.webRequest.HttpHeader;
  active: boolean;
  height: number;
}

interface Video {
  url: string;
  active: boolean;
}
