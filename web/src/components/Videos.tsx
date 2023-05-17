import axios from "axios";
import { useState } from "react";
import { VideoStore } from "../store/VideoStore";
import { VideoDownloader } from "./videos/VideoDownloader";


export const Videos: React.FC = () => {
  const { video } = VideoStore();
  // const [video, setVideo] = useState<Video[]>([]);
  const [type] = useState<string>("");


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
