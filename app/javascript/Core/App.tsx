import React from 'react';
import { Provider } from 'react-redux';
import { useFlipper } from '../hooks/useWindow';
import { setupStore } from '../store/store';
import { RouterProvider } from 'react-router-dom';
import { OfflineRouter, OnlineRouter } from './RoutesConfig';

export const App = () => {
  const isOnline = useFlipper('app_online');
  const store = setupStore();

  return (
    <Provider store={store}>
      <RouterProvider router={isOnline ? OnlineRouter : OfflineRouter} />
    </Provider>
  );
};
