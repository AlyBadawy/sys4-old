import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';

export const GetStartedButton = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  return (
    <Link
      className='p-2 px-6 bg-logoPrimary rounded-full self-baseline text-black font-bold hover:bg-logoSecondary shadow-md'
      to='/app'
    >
      {isLoggedIn ? 'Get Started' : 'Login'}
    </Link>
  );
};
