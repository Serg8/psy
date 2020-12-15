import React from 'react';
import classes from './Header.module.scss';

const Header = () => {
  return (
    <header className={classes.header}>
      <div>logo</div>
      <nav>
        <ul>
          <li>Home</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
