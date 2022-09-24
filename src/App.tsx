import React, { useState } from "react";
import Dropdown from "./components/Dropdown";

import Header from "./components/elements/Header";
import { DOMMessage, DOMMessageResponse } from "./types";

function App() {
  const [title, setTitle] = useState("");
  const [headlines, setHeadlines] = useState<string[]>([]);
  const [imgs, setImgs] = useState<string[]>([]);

  console.log(headlines);

  React.useEffect(() => {
    chrome.tabs &&
      chrome.tabs.query(
        {
          active: true,
          currentWindow: true,
        },
        (tabs) => {
          chrome.tabs.sendMessage(
            tabs[0].id || 0,
            { type: "GET_DOM" } as DOMMessage,
            (response: DOMMessageResponse) => {
              setTitle(response.title);
              setImgs(response.images);
              setHeadlines(response.headlines);
            }
          );
        }
      );
  });

  return (
    <section>
      <nav className="mb-5 bg-purple-900 px-2 py-2.5 sm:px-4">
        <Header name="DownConvert" />
      </nav>
      <Dropdown />
      <span className="text-lg">{`You Searched for: ${title}`}</span>
      <main>
        <p>Images on This side:</p>
        {imgs.map((image) => (
          <img className="images" src={image} alt="images" />
        ))}
      </main>
    </section>
  );
}

export default App;
