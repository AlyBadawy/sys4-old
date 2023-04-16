import React from 'react';
import { useAppDispatch } from '../../store/hooks';
import { logOut } from '../../auth/AuthSlice';
import { useLogoutMutation } from '../../auth/AuthApi';
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
    <button
      type='button'
      className='p-2 px-6 bg-logoPrimary rounded-full self-baseline text-black font-bold hover:bg-logoSecondary shadow-md'
      onClick={handleLogout}
    >
      Sign Out
    </button>
  );
};
