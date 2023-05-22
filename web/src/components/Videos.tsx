import { useEffect } from "react";
import { VideoStore } from "../store/VideoStore";
import { VideoDownloader } from "./videos/VideoDownload";
import { VideoMasonry } from "./videos/VideoMasonry";
import { VIDEO } from "../utils/constants";

export const Videos: React.FC = () => {
  const { upsertVideo } = VideoStore();

  useEffect(() => {
    chrome.storage.local.get(null, (items) => {
      const requests = Object.values(items) as [
        chrome.webRequest.WebResponseCacheDetails
      ];

      const vids = requests.filter(({ type }) => type === "media");
      const getUrl = requests.map((item) => item.url);

      for (let url of getUrl) {
        for (let test of VIDEO) {
          if (url.includes(test.domains.join(""))) {
            console.log(url.includes(test.domains.join("")));
          }
        }
      }

      const uniqueVideos = [
        ...new Map(vids.map((item) => [item["url"], item])).values(),
      ];

      const videos = uniqueVideos.map(({ url }) => ({ url, height: 0 }));

      for (const video of videos) {
        const vid = document.createElement("video");
        vid.onload = () =>
          upsertVideo({
            url: vid.src,
            height: vid.height,
          });
        vid.src = video.url;
      }
    });
  }, []);

  return (
    <>
      <VideoDownloader />
      <div>
        <VideoMasonry />
      </div>
    </>
  );
};
