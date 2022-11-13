import { useCallback, useEffect, useRef, useState } from 'react';
import Dropdown from './components/Dropdown';
import Header from './components/elements/Header';
import Tabs from './components/elements/Tabs';

function App() {
  const handlerRef = useRef<any>(null);
  const [imgs, setImgs] = useState<string[]>([]);

  const handleMessage = useCallback((event: Event) => {
    const { detail } =
      event as CustomEvent<chrome.webRequest.WebResponseCacheDetails>;
    if (detail.type === 'image') {
      console.log(Math.random(), detail);
      // setImgs((imgs) => [...imgs, detail.url]);
    }
  }, []);

  useEffect(() => {
    if (!handlerRef.current) {
      document.addEventListener('webRequest', handleMessage);
    }

    handlerRef.current = true;

    return () => {
      document.removeEventListener('webRequest', handleMessage);
    };
  }, [handleMessage]);

  // console.log(handlerRef.current);

  return (
    <section>
      <nav className='mb-5 px-2 py-2.5 sm:px-4'>
        <Header
          name='DownConvert'
          className={
            'tracking-tights mt-5 flex items-center justify-between rounded border-b-4  px-6 py-2 text-base font-medium text-slate-900 dark:text-white'
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
        {imgs?.map((image) => (
          <img src={image} id={image} alt='images' />
        ))}
      </main>
    </section>
  );
}

export default App;
