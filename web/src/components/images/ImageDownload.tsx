import React, { useRef } from "react";
import { ImageStore } from "../../store/ImageStore";
import { IMAGE_FORMATS } from "../../utils/constants";
import { FormatCombox } from "../elements/Combox";
import axios from "axios";

export const ImageDownload: React.FC = () => {
  const downloadLinkRef = useRef<HTMLAnchorElement>(null);
  const { images } = ImageStore();
  const { format, setFormat } = ImageStore();

  const sendImages = async (images: Image[]): Promise<void> => {
    const response = await axios.post(
      "http://localhost:3000/api/imgs",
      {
        images,
        type: format,
      },
      {
        responseType: "blob",
      }
    );
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
        setFormat={setFormat}
        formats={IMAGE_FORMATS}
      />
      <div>
        <button
          className="rounded  bg-primary px-5 py-2 font-bold text-white"
          onClick={() => sendImages(images)}
        >
          Download
        </button>
      </div>
      <a ref={downloadLinkRef} className="hidden" />
    </div>
  );
};
