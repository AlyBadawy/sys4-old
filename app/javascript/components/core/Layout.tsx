import React from 'react';
import { Outlet } from 'react-router-dom';
import { CookieConsent } from '../ui/CookieConsent';

export const Layout = () => {
  return (
    <>
      <div className='flex flex-col min-h-screen '>
        <Outlet />
      </div>
      <CookieConsent />
    </>
  );
};
