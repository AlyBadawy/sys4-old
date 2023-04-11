import React, { useEffect, useState } from 'react';
import { GetStartedButton } from './GetStartedButton';
import { NavItems } from './NavItems';
import { Link, useLocation } from 'react-router-dom';

import { LogOutButton } from './LogOutButton';

export const NavBar = () => {
  const location = useLocation();
  const [inApp, setInApp] = useState(location.pathname.includes('/app'));
  const hamburgerToggle = () => {
    const menu = document.getElementById('menu');
    const btn = document.getElementById('menu-btn');
    menu?.classList.toggle('hidden');
    btn?.classList.toggle('open');
  };

  useEffect(() => {
    setInApp(location.pathname.includes('/app'));
  }, [location.pathname]);

  return (
    <nav className='relative container mx-auto p-2 mb-8'>
      <div className='flex items-center justify-between mx-3 md:mx-0'>
        <div className='pt-2'>
          <Link to='/'>
            <img src='/images/sys4-logo.svg' alt='Sys4 Logo' className='h-8' />
          </Link>
        </div>
        <div className='hidden md:flex space-x-8'>
          <NavItems />
        </div>
        <div className='hidden md:block pt-2'>
          {inApp ? <LogOutButton /> : <GetStartedButton />}
        </div>
        <button
          id='menu-btn'
          className='block hamburger md:hidden focus:ouline-none'
          onClick={hamburgerToggle}
        >
          <span className='hamburger-top'></span>
          <span className='hamburger-middle'></span>
          <span className='hamburger-bottom'></span>
        </button>
      </div>
      <div className='md:hidden'>
        <div
          id='menu'
          className='absolute flex flex-col hidden items-center self-end py-8 mt-10 space-y-6 font-bold bg-white sm:w-auto sm:self-center left-6 right-6 drop-shadow-md'
        >
          <NavItems />
        </div>
      </div>
    </nav>
  );
};
