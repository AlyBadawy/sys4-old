import React from 'react';
import { GetStartedButton } from './GetStartedButton';
import { NavItems } from './NavItems';
import { Link } from 'react-router-dom';

export const NavBar = () => {
  const hamburgerToggle = () => {
    const menu = document.getElementById('menu');
    const btn = document.getElementById('menu-btn');
    menu?.classList.toggle('hidden');
    btn?.classList.toggle('open');
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
          className='block hamburger focus:outline-none'
          onClick={hamburgerToggle}
        >
          <span className='hamburger-top bg-amber-500'></span>
          <span className='hamburger-middle bg-amber-600'></span>
          <span className='hamburger-bottom bg-amber-700'></span>
        </button>
      </div>
      <div className='relative z-50'>
        <div
          id='menu'
          className='absolute flex flex-col hidden items-center p-4 m-2 space-y-1 bg-cyan-950 w-fit right-1 top-0 drop-shadow-lg rounded-xl'
          onClick={hamburgerToggle}
        >
          <NavItems />
          <div className='my-6 pt-4'>
            <GetStartedButton />
          </div>
        </div>
      </div>
    </nav>
  );
};
