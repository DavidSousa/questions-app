import React from 'react';

import SearchInput from './SearchInput';

import './style.css';

const Header = () => {
  return (
    <div className="header">
      <div className="menu">
        <SearchInput />
      </div>
    </div>
  );
}

export default Header;
