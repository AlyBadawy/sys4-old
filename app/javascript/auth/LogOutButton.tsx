import React from 'react';
import { useAppDispatch } from '../store/hooks';
import { logOut } from './AuthSlice';
import { useLogoutMutation } from './AuthApi';
import { toast } from 'react-toastify';

export const LogOutButton = () => {
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();

  const handleLogout = () => {
    void logout().unwrap;
    dispatch(logOut());
    toast.info('You are now signed out', {
      toastId: 'logout',
    });
  };

  return (
    <button type='button' className='s4-btn' onClick={handleLogout}>
      Sign Out
    </button>
  );
};
