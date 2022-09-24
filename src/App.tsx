import React, { useState } from 'react';
import Dropdown from './components/Dropdown';
import Tabs from './components/elements/Tabs';
import Header from './components/elements/Header';
import { DOMMessage, DOMMessageResponse } from './types';

function App() {
  const [title, setTitle] = useState('');
  const [headlines, setHeadlines] = useState<string[]>([]);
  const [imgs, setImgs] = useState<string[]>([]);

  console.log(headlines);
  console.log(title)

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
    <section className=' '>
      <nav className='mb-5 bg-purple-900 px-2 py-2.5 sm:px-4'>
        <Header
          name='DownConvert'
          className={
            'flex items-center justify-between rounded border-b-4 px-6 py-2 font-semibold text-white '
          }
        />
      </nav>
      <div>
        <Tabs />
      </div>
      <div className='mt-10'>
        <Dropdown />
      </div>
      <main className='image-container mt-10'>
        {imgs.map((image) => (
          <img src={image} id={image} alt='images' />
        ))}
      </main>
    </section>
  );
}

export default App;
