import React, { useState } from 'react';
import Header from './components/elements/Header';
import { DOMMessage, DOMMessageResponse } from './types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import DropDown from '../src/components/DropDown';

function App() {
  const [title, setTitle] = React.useState('');
  const [headlines, setHeadlines] = React.useState<string[]>([]);
  const [imgs, setImgs] = React.useState<string[]>([]);

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
            { type: 'GET_DOM' } as DOMMessage,
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
      <nav className='px-2 sm:px-4 py-2.5 mb-5 bg-purple-900'>
        <Header name='DownConvert' />
      </nav>
      <DropDown />
      <span className='text-lg'>{`You Searched for: ${title}`}</span>
      <main>
        <p>Images on This side:</p>
        {imgs.map((image) => (
          <img className='images' src={image} alt='images' />
        ))}
      </main>
    </section>
  );
}

export default App;
