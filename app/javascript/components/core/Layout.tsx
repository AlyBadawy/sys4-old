import React from 'react';
import { Outlet } from 'react-router-dom';
import { CookieConsent } from '../ui/CookieConsent';
import { Footer } from '../ui/Footer';
import { NavBar } from '../ui/NavBar';

export const Layout = () => {
  return (
    <>
      <div className='flex flex-col min-h-screen' id='layout-main'>
        <main className='container mx-auto py-2 flex-1 flex flex-col'>
          <NavBar />
          <Outlet />
        </main>
        <Footer />
      </div>
      <CookieConsent />
    </>
  );
};
