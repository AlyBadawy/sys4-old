import React from 'react';
import { Outlet } from 'react-router-dom';

export const AppContainer = () => {
  return (
    <div className='s4-container'>
      <Outlet />
    </div>
  );
};
