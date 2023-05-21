import { useRef } from "react";
import { VIDEO_FORMATS, VideoFormat } from "../../utils/constants";
import { FormatCombox } from "../elements/Combox";
import axios from "axios";
import { VideoStore } from "../../store/VideoStore";

export const VideoDownloader = () => {
  const downloadLinkRef = useRef<HTMLAnchorElement>(null);
  const { selectedVideo } = VideoStore();
  const { format, setFormat } = VideoStore();

  const sendVideo = async (videos: Video[]): Promise<void> => {
    await axios.post("http://localhost:3000/api/videos", {
      videos,
      format,
    });
  };

  return (
    <div className="downloads_container fixed flex w-full justify-between bg-downloadContainer p-3">
      <FormatCombox
        format={format}
        setFormat={(value) => setFormat(value as VideoFormat)}
        formats={VIDEO_FORMATS}
      />
      <div>
        <button
          className="rounded  bg-primary px-5 py-2 font-bold text-white"
          onClick={() => sendVideo(selectedVideo)}
        >
          Download
        </button>
        <a ref={downloadLinkRef} className="hidden" />
      </div>
    </div>
  );
};
