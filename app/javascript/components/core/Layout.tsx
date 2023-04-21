import React from 'react';
import { Outlet } from 'react-router-dom';
import { CookieConsent } from '../ui/CookieConsent';
import { Footer } from '../ui/Footer';
import { NavBar } from '../ui/NavBar';
import { ToastContainer } from 'react-toastify';

export const Layout = () => {
  return (
    <>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        limit={4}
        hideProgressBar={false}
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme='dark'
      />
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
