import React, { lazy } from 'react';
import { Layout } from './Layout';
import { NotFound } from './NotFound';
import { Home } from '../home/Home';

import { SignIn } from '../auth/SingIn';
import { SignUp } from '../auth/SignUp';
import { ForgotPassword } from '../auth/ForgotPassword';
import { ResetPassword } from '../auth/ResetPassword';
import { PrivateRoute } from '../auth/PrivateRoute';
import { GuestRoute } from '../auth/GuestRoute';
import { AppContainer } from '../app/AppContainer';
import { ElmLoader } from './suspenders/ElmLoader';

const PrivacyPolicy = lazy(() => import('./PrivacyPolicy'));
const TermsOfUse = lazy(() => import('./TermsOfUse'));
const Dashboard = lazy(() => import('../app/dashboard/Dashboard'));
const Account = lazy(() => import('../app/account/Account'));
const OfflineApp = lazy(() => import('./OfflineApp'));

export const OnlineRouterConfig = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: 'privacy', element: <ElmLoader elm={<PrivacyPolicy />} /> },
      { path: 'terms', element: <ElmLoader elm={<TermsOfUse />} /> },
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
              { index: true, element: <ElmLoader elm={<Dashboard />} /> },
              { path: 'account', element: <ElmLoader elm={<Account />} /> },
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
      { index: true, element: <ElmLoader elm={<OfflineApp />} /> },
      { path: '*', element: <ElmLoader elm={<OfflineApp />} /> },
    ],
  },
];
