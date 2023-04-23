import * as React from 'react';
import { Layout } from './Layout';
import { NotFound } from './NotFound';
import { Home } from '../home/Home';
import { PrivacyPolicy } from './PrivacyPolicy';
import { TermsOfUse } from './TermsOfUse';
import { SignIn } from '../auth/SingIn';
import { SignUp } from '../auth/SignUp';
import { ForgotPassword } from '../auth/ForgotPassword';
import { ResetPassword } from '../auth/ResetPassword';
import { PrivateRoute } from '../auth/PrivateRoute';
import { Dashboard } from '../app/dashboard/Dashboard';
import { GuestRoute } from '../auth/GuestRoute';
import { OfflineApp } from './OfflineApp';
import { AppContainer } from '../app/AppContainer';
import { Account } from '../app/account/Account';

export const OnlineRouterConfig = [
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
        children: [
          {
            path: 'app',
            element: <AppContainer />,
            children: [
              { index: true, element: <Dashboard /> },
              { path: 'account', element: <Account /> },
            ],
          },
        ],
      },
    ],
  },
];

export const OfflineRouterConfig = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <OfflineApp /> },
      { path: '*', element: <OfflineApp /> },
    ],
  },
];
