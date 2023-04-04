import React from 'react';
import { Sys4Text } from '../ui/Sys4Text';

export const OfflineApp = () => {
  return (
    <main className='container mx-auto h-screen flex flex-col'>
      <div className='mx-5 mt-2'>
        <img src='/images/sys4-logo.svg' alt='' className='h-8' />
      </div>
      <div className='mx-5 m-auto flex flex-col space-y-6 md:w-1/2 md:mx-auto'>
        <h1 className='text-3xl font-bold align-middle md:text-5xl'>
          <Sys4Text /> is offline!
        </h1>
        <p>
          We apologize for the inconvenience, but
          <Sys4Text /> is currently offline for maintenance. Our team is working
          hard to bring the application back online as soon as possible, with
          all features fully operational. We appreciate your patience during
          this time and encourage you to check back soon. If you have any
          questions or concerns, please feel free to contact us at
          support@sys4.dev. Thank you for your understanding!
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
