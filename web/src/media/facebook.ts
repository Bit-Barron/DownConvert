import axios from "axios";

const headers = {
  accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
};

async function getVideoInfo(url: string): Promise<void> {
  const client = axios.create({ headers });
  const response = await client.get(url);
  const data = response.data;

  const hdLink = getHDLink(data);
  if (hdLink) {
  } else {
  }
}

function cleanStr(str: string): Promise<string[]> {
  const tmpStr = `{"text": "${str}"}`;
  return JSON.parse(tmpStr).text;
}

function getHDLink(content: string) {
  const regexRateLimit = /playable_url_quality_hd":"([^"]+)"/;
  const matches = content.match(regexRateLimit);
  if (matches) {
    return cleanStr(matches[1]);
  } else {
    return false;
  }
}

const url = "https://www.facebook.com/gmanews/videos/635602304759254";
getVideoInfo(url);
