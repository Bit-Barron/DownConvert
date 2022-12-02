import React, { useEffect, useState } from "react";
import Dropdown from "./components/elements/Dropdown";
import Tabs from "./Tabs";
import axios from "axios";

interface Image {
  url: string;
  headers: chrome.webRequest.HttpHeader[];
  lastModified: chrome.webRequest.HttpHeader;
  format: chrome.webRequest.HttpHeader;
  date: chrome.webRequest.HttpHeader;
  expires: chrome.webRequest.HttpHeader;
  active: boolean;
}

const Popup: React.FC = () => {
  const [imgs, setImgs] = useState<Image[]>([]);

  useEffect(() => {
    chrome.storage.local.get(null, (items) => {
      const requests = Object.values(items) as [
        chrome.webRequest.WebResponseCacheDetails
      ];

      const images = requests
        .filter((request) => request.type === "image")
        .filter((image) => !image.url.toLowerCase().includes("adserver"))
        .filter((image) => !image.url.toUpperCase().includes("B28763390"));

      const filteredImages = images.filter(
        (v, i, a) => a.findIndex((t) => t.url === v.url) === i
      );

      const imagesData = filteredImages.map((image) => ({
        url: image.url,
        active: false,
        headers: image.responseHeaders,
        lastModified: image.responseHeaders.find(
          (header) => header.name === "last-modified"
        ),
        format: image.responseHeaders.find(
          (header) => header.name === "content-type"
        ),
        date: image.responseHeaders.find((header) => header.name === "date"),
        expires: image.responseHeaders.find(
          (header) => header.name === "expires"
        ),
      }));
      setImgs(imagesData);
    });
  }, []);

  const sendImages = async (images: Image[]) => {
    await axios.post("http://localhost:3000/api/imgs", images);
  };

  return (
    <>
      <section>
        <h1 className="mb-3 mt-4 text-center text-3xl font-bold text-[#E96C4C]">
          Down<span className="text-[#b65840]">Convert</span>
        </h1>
        <div>
          <Tabs />
        </div>
        <div>
          <Dropdown />
        </div>
        <div className="flex">
          <button
            className="mt-5 ml-2 rounded border-[#E96C4C] bg-[#E96C4C] py-2 px-4 font-bold text-white hover:bg-[#b1523b] "
            onClick={() =>
              setImgs(
                imgs.map((img) => ({
                  ...img,
                  active: !img.active,
                }))
              )
            }
          >
            Select All Images
          </button>

          <button
            className="mt-5 ml-2 rounded  border-[#E96C4C] bg-[#E96C4C] py-2 px-4 font-bold text-white hover:bg-[#b1523b]"
            onClick={() => sendImages(imgs.filter((img) => img.active))}
          >
            Download
          </button>
        </div>
        <main className="image-container">
          <div>
            {imgs.map((image) => {
              const { url, format, date, lastModified, expires, active } =
                image;
              const headers = format?.value.split("/")[1].toUpperCase();
              return (
                <>
                  <div
                    className={`container mb-6 overflow-hidden ${
                      active && "border-[4px] border-red-900"
                    } rounded  bg-white shadow-lg`}
                    id={image.url}
                    onClick={() => {
                      setImgs(
                        imgs.map((img) =>
                          img.url === image.url
                            ? {
                                ...img,
                                active: !img.active,
                              }
                            : img
                        )
                      );
                    }}
                  >
                    <img key={url} src={url} />
                    <div className="tag">
                      <ul className=" text-black">
                        <li>Last-Modified: {lastModified?.value} </li>
                        <li>Format: {headers}</li>
                        <li>Date: {date?.value} </li>
                        {expires && <li>Expires: {expires?.value} </li>}
                      </ul>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </main>
      </section>
    </>
  );
};

export default Popup;
