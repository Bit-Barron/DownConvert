import { useRef } from "react";
import { VIDEO_FORMATS } from "../../utils/constants";
import { FormatCombox } from "../elements/Combox";

export const VideoDownloader = () => {
  const downloadLinkRef = useRef<HTMLAnchorElement>(null);

  return (
    <div className="downloads_container fixed flex w-full justify-between bg-downloadContainer p-3">
      <FormatCombox formats={VIDEO_FORMATS} format={"orginal"} setFormat={() => "Video"}/>
      <div>
        <button className="rounded  bg-primary px-5 py-2 font-bold text-white">
          Download
        </button>
        <a ref={downloadLinkRef} className="hidden" />
      </div>
    </div>
  );
};
