import React from 'react';
import { Provider } from 'react-redux';
import { useFlipper } from '../hooks/useWindow';
import { setupStore } from '../store/store';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { OfflineRouterConfig, OnlineRouterConfig } from './RoutesConfig';

export const Root = () => {
  const isOnline = useFlipper('app_online');
  const store = setupStore();
  const OnlineRouter = createBrowserRouter(OnlineRouterConfig);
  const OfflineRouter = createBrowserRouter(OfflineRouterConfig);

  return (
    <Provider store={store}>
      <RouterProvider router={isOnline ? OnlineRouter : OfflineRouter} />
    </Provider>
  );
};
