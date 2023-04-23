import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Toasty = () => {
  return (
    <ToastContainer
      position='bottom-right'
      autoClose={3500}
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
