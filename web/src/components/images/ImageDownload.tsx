import React, { useRef } from "react";
import { ImageStore } from "../../store/ImageStore";
import { IMAGE_FORMATS, ImageFormat } from "../../utils/constants";
import { FormatCombox } from "../elements/Combox";
import axios from "axios";
import { Button } from "../elements/Button";

export const ImageDownload: React.FC = () => {
  const downloadLinkRef = useRef<HTMLAnchorElement>(null);
  const { format, setFormat, selectedImages } = ImageStore();

  const sendImages = async (images: Image[]): Promise<void> => {
    const response = await axios.post(
      "http://localhost:3000/api/imgs",
      {
        images,
        format,
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
        setFormat={(value) => setFormat(value as ImageFormat)}
        formats={IMAGE_FORMATS}
      />
      <div>
        <Button text={"Download"} onClick={() => sendImages(selectedImages)} />
      </div>
      <a ref={downloadLinkRef} className="hidden" />
    </div>
  );
};
