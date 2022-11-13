import React, { useEffect, useState } from "react";
// import logo from "@assets/img/logo.svg";

const Popup: React.FC = () => {
  const [imgs, setImgs] = useState<string[]>([]);

  const messageHandler = (request: {
    msg: string;
    data?: chrome.webRequest.WebResponseCacheDetails;
  }) => {
    const data = request?.data;
    if (data?.type === "image") {
      setImgs((imgs) => [...imgs, data.url]);
    }
  };

  useEffect(() => {
    chrome.storage.local.get(null, (items) => {
      const requests = Object.values(items) as [
        chrome.webRequest.WebResponseCacheDetails
      ];

      const images = requests.filter((request) => request.type === "image");

      setImgs(images.map((image) => image.url));
    });
    // chrome.runtime.onMessage.addListener(messageHandler);

    // return () => {
    //   chrome.runtime.onMessage.removeListener(messageHandler);
    // };
  }, []);

  return (
    <section className="image-container p-10">
      <h1 className="mb-10 text-center text-3xl font-bold text-[#E96C4C]">
        Header
      </h1>

      {imgs?.map((image) => (
        <img key={image} src={image} id={image} alt="images" />
      ))}
    </section>
  );
};

export default Popup;
