import * as React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './Layout';
import { NotFound } from './NotFound';
import { Home } from '../home/Home';
import { PrivacyPolicy } from '../staticPages/PrivacyPolicy';
import { TermsOfUse } from '../staticPages/TermsOfUse';
import { GuestRoute } from '../../auth/GuestRoute';
import { SignIn } from '../../auth/SingIn';
import { SignUp } from '../../auth/SignUp';
import { ForgotPassword } from '../../auth/ForgotPassword';
import { ResetPassword } from '../../auth/ResetPassword';
import { PrivateRoute } from '../../auth/PrivateRoute';
import { Dashboard } from '../app/dashboard';
import { OfflineApp } from '../home/OfflineApp';

export const OnlineRouter = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: 'privacy', element: <PrivacyPolicy /> },
      { path: 'terms', element: <TermsOfUse /> },
      {
        element: <GuestRoute />,
        children: [
          { path: 'sign_in', element: <SignIn /> },
          { path: 'sign_up', element: <SignUp /> },
          { path: 'forgot_password', element: <ForgotPassword /> },
          { path: 'reset_password', element: <ResetPassword /> },
        ],
      },
      {
        element: <PrivateRoute />,
        children: [{ path: 'app', element: <Dashboard /> }],
      },
    ],
  },
]);

export const OfflineRouter = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [{ index: true, element: <OfflineApp /> }],
  },
]);
