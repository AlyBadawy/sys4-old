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
        <div className='pt-2'>
          <Link to='/'>
            <img
              src='/images/sys4-logo.svg'
              alt='Sys4 Logo'
              className='h-8 cursor-hand'
            />
          </Link>
        </div>
        <div className='hidden md:flex space-x-6'>
          <NavItems />
        </div>
        <div className='hidden md:block pt-2'>
          <GetStartedButton />
        </div>
        <button
          id='menu-btn'
          className='block hamburger md:hidden focus:ouline-none'
          onClick={hamburgerToggle}
        >
          <span className='hamburger-top bg-cyan-500'></span>
          <span className='hamburger-middle bg-cyan-600'></span>
          <span className='hamburger-bottom bg-cyan-700'></span>
        </button>
      </div>
      <div className='md:hidden relative z-50'>
        <div
          id='menu'
          className='absolute flex flex-col hidden items-center self-end py-6 px-2 my-2 space-y-2 font-bold bg-cyan-950 sm:w-auto sm:self-center w-44 right-1 drop-shadow-lg rounded-xl'
          onClick={hamburgerToggle}
        >
          <NavItems />
          <div className='items-center self-center mt-8 mb-6 pt-4 space-y-6'>
            <GetStartedButton />
          </div>
        </div>
      </div>
    </nav>
  );
};
