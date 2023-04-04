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

export const S4Routes = () => {
  if (!useFlipper('app_online')) {
    return <OfflineApp />;
  }

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
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
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};
