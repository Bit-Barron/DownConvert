import React, { useEffect, useState } from "react";
import Tabs from "./Tabs";

const Popup: React.FC = () => {
  const [shouldShowSearch, setShouldShowSearch] = useState(false);
  const toggleShowSearch = () => setShouldShowSearch((prev) => !prev);
  const [imgs, setImgs] = useState<
    {
      url: string;
      headers: chrome.webRequest.HttpHeader[];
      lastModified: chrome.webRequest.HttpHeader;
      format: chrome.webRequest.HttpHeader;
      date: chrome.webRequest.HttpHeader;
      expires: chrome.webRequest.HttpHeader;
      active: boolean;
    }[]
  >([]);

  useEffect(() => {
    chrome.storage.local.get(null, (items) => {
      const requests = Object.values(items) as [
        chrome.webRequest.WebResponseCacheDetails
      ];

      const images = requests
        .filter((request) => request.type === "image")
        .filter((image) => !image.url.toLowerCase().includes("adserver"))
        .filter((image) => !image.url.toUpperCase().includes("B28763390"));

      const imagesData = images.map((image) => ({
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
      // https://secure.insightexpressai.com/adServer/adServerESI.aspx?script=false&bannerID=10865022&rnd=1668814256864&redir=https://secure.insightexpressai.com/adserver/1pixel.gif
      setImgs(imagesData);
    });
  }, []);

  return (
    <>
      <section className="">
        <h1 className="mb-3 mt-4 text-center text-3xl font-bold text-[#E96C4C]">
          Down<span className="text-[#b65840]">Convert</span>
        </h1>
        <div>
          <Tabs />
        </div>
        {/* <div>
          <Dropdown/>
        </div> */}
        <div>
          <button className="mt-5 ml-2 rounded  border-[#E96C4C] bg-[#E96C4C] py-2 px-4 font-bold text-white hover:bg-[#b1523b] ">
            Select All Images
          </button>
          <button className="mt-5 ml-2 rounded border border-[#E96C4C] bg-[#E96C4C] py-2 px-4 font-bold text-white hover:bg-[#b1523b]">
            RemoveSelect
          </button>
        </div>
        {/* <div className="mt-"><Dropdown/></div> */}
        <main className="image-container">
          <div id="">
            {imgs.map((image) => {
              const { url, format, date, lastModified, expires, active } =
                image;
              const headers = format?.value.split("/")[1].toUpperCase();
              return (
                <>
                  <div
                    className="container mb-6 overflow-hidden rounded bg-white shadow-lg"
                    id={image.url}
                  >
                    <img
                      key={url}
                      src={url}
                      onClick={() => {
                        return active == true;
                      }}
                      className={active ? " border border-red-900" : ""}
                    />
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
