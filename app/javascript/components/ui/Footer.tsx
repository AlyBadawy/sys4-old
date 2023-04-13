import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className='bg-cyan-950 mt-8 border-t-2 border-cyan-900 text-gray-400'>
      <div className='container flex flex-col-reverse justify-between px-6 py-4 mx-auto space-y-8 space-y-reverse'>
        <div className='flex flex-col-reverse items-center justify-between space-y-6 space-y-reverse md:flex-col'>
          <div className='mx-auto my-2 text-center md:hidden'>
            Copyright &copy; 2023 SYS4. All rights reserved. <br />
            Created by{' '}
            <a href='https://alybadawy.com' target='_blank' rel='noreferrer'>
              Aly Badawy
            </a>
          </div>
          <div className='md:hidden'>
            <img
              src='/images/sys4-logo-lite.svg'
              alt='Sys4 Logo'
              className='h-8'
            />
          </div>
          <div className='flex justify-center space-x-4'>
            <a href='#'>
              <img src='/images/social/facebook.svg' alt='Facebook Page' />
            </a>
            <a href='#'>
              <img src='/images/social/twitter.svg' alt='Twitter Page' />
            </a>
            <a href='#'>
              <img src='/images/social/youtube.svg' alt='youtube Page' />
            </a>
            <a href='#'>
              <img src='/images/social/instagram.svg' alt='Instagram Page' />
            </a>
          </div>
        </div>
        <div className='flex space-x-4 md:space-x-24 text-sm md:text-md justify-center'>
          <div className='hidden md:block'>
            <img
              src='/images/sys4-logo-lite.svg'
              alt='Sys4 Logo'
              className='h-8'
            />
            <div className='mx-auto my-2 text-left text-sm'>
              Copyright &copy; 2023 SYS4. All rights reserved. <br />
              Created by{' '}
              <a href='https://alybadawy.com' target='_blank' rel='noreferrer'>
                Aly Badawy
              </a>
            </div>
          </div>
          <div className='flex flex-col space-y-2'>
            <a href='#' className='hover:text-logoPrimary'>
              Home
            </a>
            <a href='#' className='hover:text-logoPrimary'>
              Products
            </a>
            <a href='#' className='hover:text-logoPrimary'>
              Pricing
            </a>
            <a href='#' className='hover:text-logoPrimary'>
              Community
            </a>
          </div>
          <div className='flex flex-col space-y-2'>
            <a href='#' className='hover:text-logoPrimary'>
              About
            </a>
            <a href='#' className='hover:text-logoPrimary'>
              Contact
            </a>
            <Link to='/privacy' className='hover:text-logoPrimary'>
              Privacy Policy
            </Link>
            <Link to='/terms' className='hover:text-logoPrimary'>
              Terms of use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
