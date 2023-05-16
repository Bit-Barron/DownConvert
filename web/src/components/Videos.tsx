import axios from "axios";
import { useState } from "react";
import { VideoStore } from "../store/VideoStore";
import { VideoDownloader } from "./videos/VideoDownloader";


export const Videos: React.FC = () => {
  const { video } = VideoStore();
  // const [video, setVideo] = useState<Video[]>([]);
  const [type] = useState<string>("");

  // useEffect(() => {
  //   chrome.storage.local.get(null, (items) => {
  //     const requests = Object.values(items) as [
  //       chrome.webRequest.WebResponseCacheDetails
  //     ];
  //     const videoRequests = requests.filter((request) =>
  //       request.responseHeaders.some(
  //         (header) =>
  //           header.name.toLowerCase() === "content-type" &&
  //           header.value.startsWith("video/")
  //       )
  //     );
  //     const videosData = videoRequests.reduce((acc, video) => {
  //       const existingVideo = acc.find((v) => v.url === video.url);
  //       if (!existingVideo) {
  //         const mp3Header = video.responseHeaders.find(
  //           (header) =>
  //             header.name.toLowerCase() === "content-type" &&
  //             header.value === "audio/mpeg"
  //         );
  //         const mp3Url = mp3Header && video.url;
  //         acc.push({
  //           url: video.url,
  //           mp3Url,
  //           active: false,
  //           headers: video.responseHeaders,
  //           lastModified: video.responseHeaders.find(
  //             (header) => header.name === "last-modified"
  //           ),
  //           format: video.responseHeaders.find(
  //             (header) => header.name === "content-type"
  //           ),
  //         });
  //       }
  //       return acc;
  //     }, []);

  //     setVideo(videosData);
  //   });
  // }, []);

  const sendVideos = async (videos: Video[]): Promise<void> => {
    const response = await axios.post("http://localhost:3000/api/videos", {
      videos,
      type,
    });
    console.log(response.data);
  };

  return (
    <>
      <VideoDownloader />
      <main className="mt-10 grid grid-cols-3">
        {video.map((videos, idx) => {
          const { url } = videos;
          return (
            <div key={idx}>
              <video controls onClick={() => sendVideos(video)}>
                <source src={url} />
              </video>
            </div>
          );
        })}
      </main>
    </>
  );
};
