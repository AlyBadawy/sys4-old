import { useLocation, Navigate, Outlet } from 'react-router-dom';
import * as React from 'react';
import { useAppSelector } from '../store/hooks';

export const PrivateRoute = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const location = useLocation();
  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
