import React from 'react';
import { Outlet } from 'react-router-dom';

export const AppContainer = () => {
  return (
    <div className='container mx-auto flex flex-col px-5 flex-1'>
      <Outlet />
    </div>
  );
};
