import React from 'react';

type Headers = {
  name: string;
};

const Header = ({ name }: Headers) => {
  return (
    <section className='flex items-center justify-between'>
      <h1>
        {name}
      </h1>
    </section>
  );
};

export default Header;
