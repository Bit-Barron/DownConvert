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
      const captureRequest = requests.filter((item) => {
        return VIDEO.some((video) => {
          return item.initiator?.includes(video.name);
        });
      });

      if (captureRequest.length > 0) {
        // Tiktok
        const tiktok = [
          ...new Set(captureRequest.map((item) => item.url)),
        ].filter((item) =>
          item.includes("https://v16-webapp-prime.tiktok.com")
        );
        // Reddit
        const reddit = [
          ...new Set(captureRequest.map((item) => item.url)),
        ].filter((item) => item.includes("https://v.redd.it/"));

        // Pr0
        const pr0 = [...new Set(captureRequest.map((item) => item.url))].filter(
          (item) => item.includes("https://thumb.pr0gramm.com/")
        );

        console.log(pr0);
      } else {
        return [];
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
