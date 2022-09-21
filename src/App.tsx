import React from 'react';
import Header from './components/elements/Header';
import Icon from './images/icon.png';

function App() {
  return (
    <section className=''>
      <nav className=' border-gray-200 px-2 sm:px-4 py-2.5 rounded bg-purple-800'>
        <Header name='DownConvert' />
      </nav>
    </section>
  );
}

export default App;
