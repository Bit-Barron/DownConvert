import axios from "axios";

export function getUrlResolver(url: string): VideoUrlResolver | undefined {
  if (url.startsWith("https://www.facebook.com/watch/?v=")) {
    return new FacebookUrlResolver();
  }
  return undefined;
}

export interface VideoUrlResolver {
  resolveVideoUrl(originurl: string): Promise<string>;
}

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
      const cleanStr = (str: any) => {
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
