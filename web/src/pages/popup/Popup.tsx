import React, { useEffect, useState } from "react";

const Popup: React.FC = () => {
  const [imgs, setImgs] = useState<
    {
      url: string;
      headers: chrome.webRequest.HttpHeader[];
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

      console.log(images);

      const imagesData = images.map((image) => ({
        url: image.url,
        headers: image.responseHeaders,
      }));
      setImgs(imagesData);
    });

    // chrome.runtime.onMessage.addListener(messageHandler);

    // return () => {
    //   // chrome.runtime.onMessage.removeListener(messageHandler);
    // };
  }, []);

  return (
    <section className="image-container p-10">
      <h1 className="mb-10 text-center text-3xl font-bold text-[#E96C4C]">
        DownConvert
      </h1>
      {imgs.map((image) => {
        const headers = image.headers;
        console.log(headers);

        return (
          <>
            <div className="container" id={image.url}>
              <div className="tag">
                <ul>
                  <li>Format:</li>
                  <li>View: </li>
                  <li>Likes: </li>
                </ul>
              </div>
              <img
                key={image.url}
                src={image.url}
                alt="images"
                className="image-container"
              />
            </div>
          </>
        );
      })}
    </section>
  );
};

export default Popup;
