import React, { useEffect, useState } from "react";
// import logo from "@assets/img/logo.svg";

const Popup: React.FC = () => {
  const [imgs, setImgs] = useState<string[]>([]);

  useEffect(() => {
    const messageHandler = (request) => {
      const data = request?.data as chrome.webRequest.WebResponseCacheDetails;
      if (data?.type === "image") {
        const headers = data.responseHeaders;
        console.log(headers);
        setImgs((imgs) => [...imgs, data.url]);
      }
    };

    chrome.runtime.onMessage.addListener(messageHandler);

    return () => {
      chrome.runtime.onMessage.removeListener(messageHandler);
    };
  }, []);

  return (
    <section className="p-10">
      <h1 className="font-bold text-lg">Header</h1>

      {imgs?.map((image) => (
        <img key={image} src={image} id={image} alt="images" />
      ))}
    </section>
  );
};

export default Popup;
