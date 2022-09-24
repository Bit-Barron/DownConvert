import {FiSettings} from 'react-icons/fi'

type Headers = {
  name: string;
  className: any;
};

const Header = ({ name, className }: Headers) => {
  return (
    <section className={className}>
      <h1>{name}</h1>
      <FiSettings className='text-lg hover:text-gray-300'  />
    </section>
  );
};

export default Header;
