import axios from "axios";
import fs from "fs";

// get the url and resolver
export function getUrlResolver(url: string): VideoUrlResolver | undefined {
  if (url.startsWith("https://www.facebook.com/watch?v=")) {
    return new FacebookUrlResolver();
  } else if (url.startsWith("https://v16-webapp-prime.tiktok.com")) {
    return new TikTokUrlResolver();
  } else if (url.startsWith("https://cf-st.sc-cdn.net/")) {
    return new SnapchatUrlResolver();
  }
  return undefined;
}

export interface VideoUrlResolver {
  resolveVideoUrl(originurl: string): Promise<string>;
}

// facebook url Resolver -> Facebook Works

export class FacebookUrlResolver implements VideoUrlResolver {
  async resolveVideoUrl(originurl: string): Promise<string> {
    const headers = {
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    };
    const client = axios.create({ headers });
    const response = await client.get(originurl);
    const data = response.data;

    const regexRateLimit = /playable_url_quality_hd":"([^"]+)"/;
    const matches = data.match(regexRateLimit);
    if (matches) {
      const cleanStr = (str: string) => {
        const tmpStr = `{"text": "${str}"}`;
        return JSON.parse(tmpStr).text;
      };
      const hdLink = cleanStr(matches[1]);
      console.log("tesd");
      console.log(hdLink);
      return hdLink;
    }
    return "";
  }
}
// Tiktok url resolver
export class TikTokUrlResolver implements VideoUrlResolver {
  async resolveVideoUrl(originurl: string): Promise<string> {
    const pattern =
      /^((?:https?:)?\/\/)?((?:m|vm|vt|www)\.)??((?:tiktok\.com))\/((?:[\w\-]{6}(?:\/|))|[@](\S+))/;
    const cleanUrl = originurl.split("?")[0];

    return originurl;
  }
}

// Snapchat url resolver -> Snapchat Work
export class SnapchatUrlResolver implements VideoUrlResolver {
  async resolveVideoUrl(originurl: string): Promise<string> {
    console.log(originurl)
    return originurl;
  }
}
