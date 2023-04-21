import React from 'react';
import { render } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { RootState, rootReducer } from '../store/store';
import { BrowserRouter } from 'react-router-dom';
import { appApi } from '../store/api/appApi';

// As a basic setup, import your same slice reducers

export const renderWithRedux = (
  ui: React.ReactElement,
  flippers?: Record<string, boolean>,
  preloadedState?: Partial<RootState>
) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }).concat(appApi.middleware),
  });
  if (flippers) {
    window.FLIPPERS = flippers;
  }
  return render(
    <Provider store={store}>
      <BrowserRouter>{ui}</BrowserRouter>
    </Provider>
  );
};

export const simpleRenderWithRedux = (
  ui: React.ReactElement,
  flippers?: Record<string, boolean>,
  preloadedState?: Partial<RootState>
) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }).concat(appApi.middleware),
  });
  if (flippers) {
    window.FLIPPERS = flippers;
  }
  return render(<Provider store={store}>{ui}</Provider>);
};
