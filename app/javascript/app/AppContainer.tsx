import React from 'react';
import { Outlet } from 'react-router-dom';

const AppContainer = () => {
  return (
    <div className='s4-container'>
      <Outlet />
    </div>
  );
};

export default AppContainer;