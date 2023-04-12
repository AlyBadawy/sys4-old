import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { LogOutButton } from './LogOutButton';

export const GetStartedButton = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const location = useLocation();
  const [inApp, setInApp] = useState(location.pathname.includes('/app'));

  useEffect(() => {
    setInApp(location.pathname.includes('/app'));
  }, [location.pathname]);

  if (isLoggedIn && inApp) return <LogOutButton />;

  return (
    <Link
      className='p-2 px-6 bg-logoPrimary rounded-full self-baseline text-black font-bold hover:bg-logoSecondary shadow-md'
      to='/app'
    >
      {isLoggedIn ? 'Get started' : 'Login'}
    </Link>
  );
};
