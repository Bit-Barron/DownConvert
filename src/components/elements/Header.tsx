import React from 'react';

type Headers = {
  name: string;
};

const Header = ({ name }: Headers) => {
  return (
    <section className='flex items-center justify-between'>
      <h1 className='text-center px-6 py-2 font-semibold text-white '>
        {name}
      </h1>
    </section>
  );
};

export default Header;
