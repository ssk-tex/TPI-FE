import React from 'react';

const Header = ({head}) => {
  return (
    <header className="flex justify-center bg-blue-600 text-white p-4">
      <h1 className="text-2xl font-bold">{head}</h1>
    </header>
  );
};

export default Header;
