import { useEffect } from "react";
import { ImageStore } from "../store/ImageStore";
import { ImageMasonry } from "./images/ImageMasonry";

export const Images = () => {
  const { upsertImage } = ImageStore();

  useEffect(() => {
    chrome.storage.local.get(null, (items) => {
      const requests = Object.values(items) as [
        chrome.webRequest.WebResponseCacheDetails
      ];
      const imgs = requests.filter(({ type }) => type === "image");

      const uniqueImages = [
        ...new Map(imgs.map((item) => [item["url"], item])).values(),
      ];
      console.log(uniqueImages);

      const images = uniqueImages.map(({ url }) => ({ url, height: 0 }));

      for (const image of images) {
        const img = new Image();
        img.onload = async() => await upsertImage({ url: img.src, height: img.height });
        img.src = image.url;
      }
    });
  }, []);

  return (
    <section>
      <div className="mt-6">
        <ImageMasonry />
      </div>
    </section>
  );
};
