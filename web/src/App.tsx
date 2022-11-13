import Dropdown from './components/Dropdown';
import Header from './components/elements/Header';
import Tabs from './components/elements/Tabs';
import { useState } from 'react';

function App() {
  const [details, setDetails] = useState();

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
        <div className='text-4xl'></div>
      </main>
    </section>
  );
}

export default App;
