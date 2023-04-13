import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className='bg-cyan-950 mt-8 border-t-2 border-cyan-900 text-gray-400'>
      <div className='container flex flex-col-reverse justify-between px-6 py-10 mx-auto space-y-8 space-y-reverse md:flex-row md:space-y-0'>
        <div className='flex flex-col-reverse items-center justify-between space-y-12  space-y-reverse md:flex-col md:space-y-0 md:items-start'>
          <div className='mx-auto my-6 text-center md:hidden'>
            Copyright &copy; 2023 SYS4. All rights reserved.
          </div>
          <div>
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
        <div className='flex justify-around space-x-32'>
          <div className='flex flex-col space-y-3'>
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
          <div className='flex flex-col space-y-3'>
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

        <div className='flex flex-col justify-between'>
          <form className='hidden md:block'>
            <div className='flex space-x-3 items-center align-middle'>
              <input
                type='email'
                placeholder='iLove@sys4.dev'
                className='flex-1 p-2 px-4 rounded-full outline-none focus:border-transparent text-gray-800 h-10 w-full'
              />
              <button className='p-2 px-6 bg-logoSecondary text-white rounded-full self-baseline font-bold hover:bg-logoSecondary shadow-md h-10'>
                Go
              </button>
            </div>
          </form>
          <div className='hidden md:block'>
            Copyright &copy; 2023 SYS4. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
