import React from 'react';
import { useAppDispatch } from '../store/store';
import { logOut } from '../store/slices/UserSlice';
import { useLogoutMutation } from '../store/api/UserApi';
import { toast } from 'react-toastify';
import { resetLayout } from '../store/slices/LayoutSlice';

export const LogOutButton = () => {
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();

  const handleLogout = () => {
    void logout().unwrap;
    dispatch(logOut());
    dispatch(resetLayout());
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
