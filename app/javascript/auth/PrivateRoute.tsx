import { useLocation, Navigate, Outlet } from 'react-router-dom';
import * as React from 'react';
import { useSignedIn } from '../hooks/useAuth';

export const PrivateRoute = () => {
  const isLoggedIn = useSignedIn();
  const location = useLocation();
  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to='/sign_in' state={{ from: location }} replace />
  );
};
