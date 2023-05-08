import React from 'react';
import { Sys4Text } from '../ui/Sys4Text';

const OfflineApp = () => {
  return (
    <div className='mx-5 m-auto flex flex-col space-y-6 md:w-1/2 md:mx-auto'>
      <h1 className='text-3xl font-bold align-middle md:text-5xl'>
        <Sys4Text /> is offline!
      </h1>
      <p>
        We apologize for the inconvenience, but
        <Sys4Text /> is currently offline for maintenance. Our team is working
        hard to bring the application back online as soon as possible, with all
        features fully operational. We appreciate your patience during this time
        and encourage you to check back soon. If you have any questions or
        concerns, please feel free to contact us at support@sys4.dev. Thank you
        for your understanding!
      </p>
    </div>
  );
};

export default OfflineApp;
