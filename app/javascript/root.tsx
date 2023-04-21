import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { useFlipper } from './hooks/useWindow';
import { setupStore } from './store/store';
import { RouterProvider } from 'react-router-dom';
import { OfflineRouter, OnlineRouter } from './components/core/RoutesConfig';

document.addEventListener('DOMContentLoaded', () => {
  const rootEl = document.getElementById('root');
  const root = ReactDOM.createRoot(rootEl!);
  const isOnline = useFlipper('app_online');
  const store = setupStore();

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={isOnline ? OnlineRouter : OfflineRouter} />
      </Provider>
    </React.StrictMode>
  );
});
