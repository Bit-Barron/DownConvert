import React, { useEffect } from "react";
import logo from "@assets/img/logo.svg";

const Popup: React.FC = () => {
  useEffect(() => {
    const handleMessage = (event: Event) => {
      const { detail } =
        event as CustomEvent<chrome.webRequest.WebResponseCacheDetails>;
      if (detail.type === "image") {
        console.log(Math.random(), detail);
        // setImgs((imgs) => [...imgs, detail.url]);
      }
    };

    document.addEventListener("webRequest", handleMessage);

    return () => {
      document.removeEventListener("webRequest", handleMessage);
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="text-3xl font-bold underline">Hello wasdorld!</h1>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React!
        </a>
      </header>
    </div>
  );
};

export default Popup;
