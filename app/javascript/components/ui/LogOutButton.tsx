import React from 'react';
import { useAppDispatch } from '../../store/hooks';
import { logOut } from '../../auth/AuthSlice';

export const LogOutButton = () => {
  const dispatch = useAppDispatch();
  return (
    <button
      type='button'
      className='p-2 px-6 bg-logoPrimary rounded-full self-baseline text-black font-bold hover:bg-logoSecondary shadow-md'
      onClick={() => dispatch(logOut())}
    >
      Log Out
    </button>
  );
};
