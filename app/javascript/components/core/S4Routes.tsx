import * as React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { GuestRoute } from '../../auth/GuestRoute';
import { Login } from '../../auth/Login';
import { PrivateRoute } from '../../auth/PrivateRoute';
import { Home } from '../home/Home';
import { Layout } from './Layout';
import { useFlipper } from '../../hooks/useFlipper';
import { OfflineApp } from '../home/OfflineApp';
import { NotFound } from './NotFound';
import { Dashboard } from '../app/dashboard';
import { PrivacyPolicy } from '../staticPages/PrivacyPolicy';
import { TermsOfUse } from '../staticPages/TermsOfUse';

export const S4Routes = () => {
  const isOnline = useFlipper('app_online');

  return (
    <Provider store={store}>
      <BrowserRouter>
        {isOnline && (
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<Home />} />
              <Route path='privacy' element={<PrivacyPolicy />} />
              <Route path='terms' element={<TermsOfUse />} />
              {/* Any Person route */}

              <Route element={<GuestRoute />}>
                <Route path='login' element={<Login />} />
              </Route>
              {/* un-signed in routes */}

              <Route element={<PrivateRoute />}>
                <Route path='app' element={<Dashboard />} />
              </Route>
              {/* Private routes */}
            </Route>
            <Route path='*' element={<Layout />}>
              <Route path='*' element={<NotFound />} />
            </Route>
          </Routes>
        )}
        {!isOnline && (
          <Routes>
            <Route path='*' element={<Layout />}>
              <Route path='*' element={<OfflineApp />} />
            </Route>
          </Routes>
        )}
      </BrowserRouter>
    </Provider>
  );
};
