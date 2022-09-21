import React, { useState } from 'react';
import Header from './components/elements/Header';
import DropDown from './components/elements/DropDown';

function App() {
  const [open, setOpen] = useState();
  return (
    <section className=''>
      <nav className='px-2 sm:px-4 py-2.5  mb-5 bg-purple-800'>
        <Header name='DownConvert' />
      </nav>
      <DropDown />
    </section>
  );
}

export default App;
