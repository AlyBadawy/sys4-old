import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { LogOutButton } from '../../auth/LogOutButton';

export const GetStartedButton = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const location = useLocation();
  const [inApp, setInApp] = useState(location.pathname.includes('/app'));

  useEffect(() => {
    setInApp(location.pathname.includes('/app'));
  }, [location.pathname]);

  if (isLoggedIn && inApp) return <LogOutButton />;

  return (
    <Link className='s4-btn' to='/app'>
      {isLoggedIn ? 'Dashboard' : 'Sign in'}
    </Link>
  );
};
