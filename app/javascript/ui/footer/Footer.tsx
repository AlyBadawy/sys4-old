import React from 'react';
import { Link } from 'react-router-dom';
import { FooterCredits } from './FooterCredits';
import { FooterSocial } from './FooterSocial';

export const Footer = () => {
  return (
    <footer className='bg-cyan-950 border-t-2 border-cyan-900 text-gray-400 text-xs mt-2'>
      <div className='container flex flex-col-reverse justify-between px-6 py-4 mx-auto space-y-8 space-y-reverse'>
        <div className='flex flex-col-reverse items-center justify-between space-y-6 space-y-reverse md:flex-col'>
          <div className='mx-auto my-2 text-center md:hidden'>
            <FooterCredits />
          </div>
          <FooterSocial />
          <div className='md:hidden'>
            <img
              src='/images/sys4-logo-lite.svg'
              alt='Sys4 Logo'
              className='h-8'
            />
          </div>
        </div>
        <div className='flex items-center justify-evenly md:text-md md:text-left'>
          <div className='hidden md:block'>
            <img
              src='/images/sys4-logo-lite.svg'
              alt='Sys4 Logo'
              className='h-8'
            />
            <div className='mx-auto my-2 text-left'>
              <FooterCredits />
            </div>
          </div>
          <div className='flex flex-col space-y-2'>
            <Link to='/'>Home</Link>
            <Link to='/products'>Products</Link>
            <Link to='/prices'>Prices</Link>
            <Link to='/community'>Community</Link>
          </div>
          <div className='flex flex-col space-y-2'>
            <Link to='/about'>About</Link>
            <Link to='/contact'>Contact</Link>
            <Link to='/privacy'>Privacy Policy</Link>
            <Link to='/terms'>Terms of use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
