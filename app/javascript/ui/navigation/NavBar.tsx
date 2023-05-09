import React from 'react';
import { NavItems } from './NavItems';
import { Link } from 'react-router-dom';

export const NavBar = () => {
  const [menuVisibility, setMenuVisibility] = React.useState(false);

  const hamburgerToggle = () => {
    setMenuVisibility(!menuVisibility);
  };

  return (
    <nav className='relative container mx-auto p-2 mb-8'>
      <div className='flex items-center justify-between mx-3 md:mx-0'>
        <div className='pt-2 animate-pulse'>
          <Link to='/'>
            <img
              src='/images/sys4-logo.svg'
              alt='Sys4 Logo'
              className='h-8 cursor-hand'
            />
          </Link>
        </div>
        <button
          id='menu-btn'
          data-testid='nav-menu-btn'
          aria-label='Navigation Menu'
          className={`block hamburger focus:outline-none ${
            menuVisibility ? 'open' : ''
          }`}
          onClick={hamburgerToggle}
        >
          <span className='hamburger-top bg-amber-500'></span>
          <span className='hamburger-middle bg-amber-600'></span>
          <span className='hamburger-bottom bg-amber-700'></span>
        </button>
      </div>
      <div className='relative z-50'>
        {menuVisibility && (
          <div
            id='menu'
            data-testid='nav-menu'
            className='absolute flex flex-col items-center p-4 m-2 space-y-1 bg-cyan-950 w-fit right-1 top-0 drop-shadow-lg rounded-xl'
            onClick={hamburgerToggle}
          >
            <NavItems />
          </div>
        )}
      </div>
    </nav>
  );
};
