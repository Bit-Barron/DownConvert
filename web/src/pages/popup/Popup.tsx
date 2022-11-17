import React, { useEffect, useState } from "react";

const Popup: React.FC = () => {
  const [imgs, setImgs] = useState<
    {
      url: string;
      headers: chrome.webRequest.HttpHeader[];
      type: chrome.webRequest.ResourceType;
      format: chrome.webRequest.HttpHeader;
      server: chrome.webRequest.HttpHeader;
      date: chrome.webRequest.HttpHeader;
    }[]
  >([]);

  // const messageHandler = (request: {
  //   msg: string;
  //   data?: chrome.webRequest.WebResponseCacheDetails;
  // }) => {
  //   const data = request?.data;
  //   if (data?.type === "image") {
  //     setImgs((imgs) => [...imgs, data.url]);
  //   }
  // };

  useEffect(() => {
    chrome.storage.local.get(null, (items) => {
      const requests = Object.values(items) as [
        chrome.webRequest.WebResponseCacheDetails
      ];

      const images = requests.filter((request) => request.type === "image");

      const imagesData = images.map((image) => ({
        url: image.url,
        headers: image.responseHeaders,
        type: image.type,
        format: image.responseHeaders.find(
          (header) => header.name === "content-type"
        ),
        server: image.responseHeaders.find(
          (header) => header.name === "server"
        ),
        date: image.responseHeaders.find((header) => header.name === "date"),
      }));
      chrome.storage.local.clear(function () {
        var error = chrome.runtime.lastError;
        if (error) {
          console.error(error);
        }
        // do something more
      });

      setImgs(imagesData);
    });

    // chrome.runtime.onMessage.addListener(messageHandler);

    // return () => {
    // chrome.runtime.onMessage.removeListener(messageHandler);
    // };
  }, []);

  return (
    <section className="image-conatainer ">
      <h1 className=" text-center text-3xl font-bold text-[#E96C4C]">
        DownConvert
      </h1>
      {imgs.map((image) => {
        const { url, headers, type, format, date, server } = image;
        console.log(headers);
        return (
          <>
            <div className="" id={image.url}>
              <img
                key={url}
                src={url}
                alt="images"
                className="min-h-full min-w-full"
              />
              <div className="tag">
                <ul className="text-black">
                  <li>Type: {type} </li>
                  <li>Format: {format?.value}</li>
                  <li>Date: {date?.value} </li>
                  <li>Server: {server?.value} </li>

                </ul>
              </div>
            </div>
          </>
        );
      })}
    </section>
  );
};

export default Popup;
