import React from 'react';
import { Sys4Text } from '../ui/Sys4Text';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <main className='container mx-auto h-screen flex flex-col'>
      <div className='mx-5 mt-2'>
        <img src='/images/sys4-logo.svg' alt='' className='h-8' />
      </div>
      <div className='mx-5 m-auto flex flex-col space-y-6 md:w-1/2 md:mx-auto'>
        <h1 className='text-3xl font-bold align-middle md:text-5xl'>
          <Sys4Text />
          04: Page not found!
        </h1>
        <p>
          We are sorry, but the page you are looking for does not exist or has
          been moved.
        </p>
        <p>
          Please check the URL for any typos or errors, or try searching for
          what you are looking for using the search bar at the top of the page.
          You can also browse our website using the navigation menu or return to
          the homepage by clicking the button below:
        </p>
        <p>
          <Link to='/'>Return to Homepage</Link>
        </p>
        <p>
          If you continue to experience issues or have any questions, please
          feel free to contact us at support@sys4.dev. We apologize for any
          inconvenience and thank you for your understanding.
        </p>
      </div>
      <div className='mx-5 text-gray-500 text-sm'>
        <p className='mb-2'>
          Created by
          <a href='https://alybadawy.com' className='text-logoSecondary'>
            Aly Badawy
          </a>
          <br />
          Copyright &copy; 2023 by SYS4. All rights reserved.
        </p>
      </div>
    </main>
  );
};
