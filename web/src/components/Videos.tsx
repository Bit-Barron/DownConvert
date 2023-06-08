import { useEffect } from "react";
import { VideoDownloader } from "./videos/VideoDownload";
import { getUrlResolver } from "../resolver/videoUrlResolver";
import { VideoStore } from "../store/VideoStore";

export const Videos: React.FC = () => {
  const { upsertVideo, setUrl, url } = VideoStore();

  useEffect(() => {
    chrome.storage.local.get(null, async (items) => {
      const requests = Object.values(items) as [
        chrome.webRequest.WebResponseCacheDetails
      ];
      for (const item of requests) {
        const resolver = getUrlResolver(item.url);
        if (!resolver) continue;
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

      <div className="mt-10">
        {url ? (
          <div>
            <video controls onClick={() => setUrl(url)}>
              <source src={url} />
            </video>
          </div>
        ) : (
          <div>
            <h1 className="text-white font-bold flex text-2xl h-screen justify-center items-center">
              Loading....
            </h1>
          </div>
        )}
      </div>
    </>
  );
};
