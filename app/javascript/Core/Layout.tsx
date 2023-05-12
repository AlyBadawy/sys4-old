import React from 'react';
import { Outlet } from 'react-router-dom';
import { CookieConsent } from './legalPages/CookieConsent';
import { Footer } from '../ui/footer/Footer';
import { NavBar } from '../ui/navigation/NavBar';
import { Toasty } from './Toasty';

export const Layout = () => {
  return (
    <>
      <Toasty />
      <div className='flex flex-col min-h-screen' id='layout-main'>
        <main className='flex flex-col flex-1'>
          <NavBar />
          <Outlet />
        </main>
        <Footer />
      </div>
      <CookieConsent />
    </>
  );
};
