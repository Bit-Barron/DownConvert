import { useRef } from "react";
import { VIDEO_FORMATS, VideoFormat } from "../../utils/constants";
import { FormatCombox } from "../elements/Combox";
import { VideoStore } from "../../store/VideoStore";
import { Button } from "../elements/Button";
import { FacebookStore } from "../../store/FacebookStore";
import axios from "axios";

export const VideoDownloader = () => {
  const downloadLinkRef = useRef<HTMLAnchorElement>(null);
  const { format, setFormat } = VideoStore();
  const { videourl } = FacebookStore();

  const sendVideo = async (video: string): Promise<void> => {
    const response = await axios.post(
      "http://localhost:3000/api/videos",
      {
        video,
        format,
      },
      {
        responseType: "blob",
      }
    );

    console.log(response);
    const contentdisposition =
      response.headers["content-disposition"].split("=")[1];
    const blob = new Blob([response.data], { type: "application/zip" });

    if (downloadLinkRef.current) {
      downloadLinkRef.current.href = URL.createObjectURL(blob);
      downloadLinkRef.current.download = contentdisposition;
      downloadLinkRef.current.click();
      URL.revokeObjectURL(downloadLinkRef.current.href);
    }
  };

  return (
    <div className="downloads_container fixed flex w-full justify-between bg-downloadContainer p-3">
      <FormatCombox
        format={format}
        setFormat={(value) => setFormat(value as VideoFormat)}
        formats={VIDEO_FORMATS}
      />
      <div>
        <Button text={"Download"} onClick={() => sendVideo(videourl)} />
        <a ref={downloadLinkRef} className="hidden" />
      </div>
    </div>
  );
};
