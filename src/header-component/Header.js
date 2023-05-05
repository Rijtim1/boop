import React from 'react';
import Logo from './LogoComponent';
import Search from './Search';

const Header = () => {
  return (
    <header className="bg-gray-900">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <Logo />
          <Search />
        </div>
      </div>
    </header>
  );
};

export default Header;
