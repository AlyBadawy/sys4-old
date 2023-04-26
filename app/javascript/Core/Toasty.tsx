import React from 'react';
import { ToastContainer } from 'react-toastify';

export const Toasty = () => {
  return (
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
  );
};
