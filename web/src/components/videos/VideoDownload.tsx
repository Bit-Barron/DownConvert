import { useRef } from "react";
import { VIDEO_FORMATS, VideoFormat } from "../../utils/constants";
import { FormatCombox } from "../elements/Combox";
import axios from "axios";
import { VideoStore } from "../../store/VideoStore";
import { Button } from "../elements/Button";
import { GeneralStore } from "../../store/GeneralStore";

export const VideoDownloader = () => {
  const downloadLinkRef = useRef<HTMLAnchorElement>(null);
  const { format, setFormat, url } = VideoStore();
  const { addAlert } = GeneralStore();

  const sendVideo = async (videos: string): Promise<void> => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/videos",
        {
          videos,
          format,
        },
        {
          responseType: "blob", // Specify the response type as 'blob'
        }
      );

      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });

      if (downloadLinkRef.current) {
        downloadLinkRef.current.href = URL.createObjectURL(blob);
        downloadLinkRef.current.download = `video.${format}`; // Set a default filename
        downloadLinkRef.current.click();
        URL.revokeObjectURL(downloadLinkRef.current.href);
      }

      console.log(response);
    } catch (err) {
      addAlert({
        msg: `Not type of ${format}`,
        type: "failure",
      });
    }
  };

  return (
    <>
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
    </>
  );
};
