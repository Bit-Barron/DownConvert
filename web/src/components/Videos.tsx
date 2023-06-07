import { useEffect } from "react";
import { VideoDownloader } from "./videos/VideoDownload";
import { getUrlResolver } from "../resolver/videoUrlResolver";
import { VideoStore } from "../store/VideoStore";
import { Spinner } from "./elements/Spinner";
import { FacebookStore } from "../store/FacebookStore";

export const Videos: React.FC = () => {
  const { url } = VideoStore();
  const { upsertVideo, setSelectedVideo } = VideoStore();
  const { setUrl } = FacebookStore();

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
      <div>
        {url ? (
          <div className="mt-10">
            <video controls onClick={() => setUrl(url)}>
              <source src={url} />
            </video>
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    </>
  );
};
