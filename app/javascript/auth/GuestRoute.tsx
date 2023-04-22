import { useLocation, Navigate, Outlet } from 'react-router-dom';
import * as React from 'react';
import { useSignedIn } from '../hooks/useAuth';

export const GuestRoute = () => {
  const isLoggedIn = useSignedIn();
  const location = useLocation();
  return isLoggedIn ? (
    <Navigate to='/app' state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
};
