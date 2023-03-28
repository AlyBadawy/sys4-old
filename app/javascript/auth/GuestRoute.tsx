import { useLocation, Navigate, Outlet } from 'react-router-dom';
import * as React from 'react';
import { useAppSelector } from '../store/hooks';

export const GuestRoute = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const location = useLocation();
  return isLoggedIn ? (
    <Navigate to="/dashboard" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
};
