import { useRef } from "react";
import { VIDEO_FORMATS, VideoFormat } from "../../utils/constants";
import { FormatCombox } from "../elements/Combox";
import axios from "axios";
import { VideoStore } from "../../store/VideoStore";
import { Button } from "../elements/Button";

export const VideoDownloader = () => {
  const downloadLinkRef = useRef<HTMLAnchorElement>(null);
  const { format, setFormat, url } = VideoStore();

  const sendVideo = async (videos: string): Promise<void> => {
    const response = await axios.post("http://localhost:3000/api/videos", {
      videos,
      format,
    });
    const contentDisposition = response.headers["content-disposition"];
    const blob = new Blob([response.data], { type: `video/${format}` }); // Change the MIME type to match your video format

    if (downloadLinkRef.current) {
      downloadLinkRef.current.href = URL.createObjectURL(blob);
      downloadLinkRef.current.download = contentDisposition;
      downloadLinkRef.current.click();
      URL.revokeObjectURL(downloadLinkRef.current.href);
    }

    console.log(response);
  };

  return (
    <div className="downloads_container fixed flex w-full justify-between bg-downloadContainer p-3">
      <FormatCombox
        format={format}
        setFormat={(value) => setFormat(value as VideoFormat)}
        formats={VIDEO_FORMATS}
      />
      <div>
        <Button text={"Download"} onClick={() => sendVideo(url)} />
        <a ref={downloadLinkRef} className="hidden" />
      </div>
    </div>
  );
};
