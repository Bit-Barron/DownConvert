import { useEffect } from "react";
import { VideoDownloader } from "./videos/VideoDownload";
import { getUrlResolver } from "../resolver/videoUrlResolver";
import { FacebookStore } from "../store/FacebookStore";
import { VideoStore } from "../store/VideoStore";

export const Videos: React.FC = () => {
  const { videourl } = FacebookStore();
  const { upsertVideo } = VideoStore();

  useEffect(() => {
    chrome.storage.local.get(null, async (items) => {
      const requests = Object.values(items) as [
        chrome.webRequest.WebResponseCacheDetails
      ];
      for (let item of requests) {
        let resolver = getUrlResolver(item.url);
        if (!resolver) {
          continue;
        }
        const vid = document.createElement("video");
        vid.onload = () =>
          upsertVideo({
            url: vid.src,
            height: vid.height,
          });

        vid.src = await resolver.resolveVideoUrl(item.url);
      }
    });
  }, []);

  return (
    <>
      <VideoDownloader />
      <div>
        <div>
          <video controls>
            <source src={videourl} />
          </video>
        </div>
      </div>
    </>
  );
};
