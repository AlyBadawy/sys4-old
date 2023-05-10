import React, { lazy } from 'react';
import { GuestRoute } from '../auth/GuestRoute';
import { PrivateRoute } from '../auth/PrivateRoute';
import { Home } from '../home/Home';
import { Layout } from './Layout';
import { ElmLoader } from './suspenders/ElmLoader';
const SignIn = lazy(() => import('../auth/SingIn'));
const SignUp = lazy(() => import('../auth/SignUp'));
const ForgotPassword = lazy(() => import('../auth/ForgotPassword'));
const ResetPassword = lazy(() => import('../auth/ResetPassword'));
const PrivacyPolicy = lazy(() => import('./PrivacyPolicy'));
const TermsOfUse = lazy(() => import('./TermsOfUse'));
const OfflineApp = lazy(() => import('./OfflineApp'));
const Dashboard = lazy(() => import('../app/dashboard/Dashboard'));
const Account = lazy(() => import('../app/account/Account'));
const AppContainer = lazy(() => import('../app/AppContainer'));

const NotFound = lazy(() => import('./NotFound'));

export const OnlineRouterConfig = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <ElmLoader elm={<NotFound />} />,
    children: [
      { index: true, element: <Home /> },
      { path: 'privacy', element: <ElmLoader elm={<PrivacyPolicy />} /> },
      { path: 'terms', element: <ElmLoader elm={<TermsOfUse />} /> },
      {
        element: <GuestRoute />,
        children: [
          { path: 'sign_in', element: <ElmLoader elm={<SignIn />} /> },
          { path: 'sign_up', element: <ElmLoader elm={<SignUp />} /> },
          {
            path: 'forgot_password',
            element: <ElmLoader elm={<ForgotPassword />} />,
          },
          {
            path: 'reset_password',
            element: <ElmLoader elm={<ResetPassword />} />,
          },
        ],
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            path: 'app',
            element: <ElmLoader elm={<AppContainer />} />,
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
