import axios from "axios";
import { VideoStore } from "../store/VideoStore";

// get the url and resolver
export function getUrlResolver(url: string): VideoUrlResolver | undefined {
  if (
    url.startsWith("https://www.facebook.com/watch/?v=") ||
    url.startsWith("https://www.facebook.com/watch?v=")
  ) {
    return new FacebookUrlResolver();
  } else if (url.startsWith("https://v16-webapp-prime.tiktok.com")) {
    // return new TikTokUrlResolver();
  } else if (
    url.startsWith(
      "https://cf-st.sc-cdn.net/d/" ||
        url.startsWith("https://cf-st.sc-cdn.net/p/")
    )
  ) {
    return new SnapchatUrlResolver();
  }
}

export interface VideoUrlResolver {
  resolveVideoUrl(originurl: string): Promise<string>;
}

// facebook url Resolver -> Facebook Works
export class FacebookUrlResolver implements VideoUrlResolver {
  async resolveVideoUrl(originurl: string): Promise<string> {
    const { setUrl } = VideoStore.getState();
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
      setUrl(hdLink);
      return hdLink;
    }
    return "";
  }
}

// Snapch^at url resolver -> Snapchat Work
export class SnapchatUrlResolver implements VideoUrlResolver {
  async resolveVideoUrl(originurl: string): Promise<string> {
    const { setUrl } = VideoStore.getState();
    setUrl(originurl);
    return "";
  }
}
