import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { GuestRoute } from '../auth/GuestRoute';
import { Login } from '../auth/Login';
import { PrivateRoute } from '../auth/PrivateRoute';
import { store } from '../store/store';
import { Dashboard } from './Dashboard';
import { Home } from './Home';
import { Layout } from './Layout';

export const App = () => {
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
              <Route path='dashboard' element={<Dashboard />} />
            </Route>
            {/* Private routes */}
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};
