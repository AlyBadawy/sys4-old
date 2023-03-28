import { configureStore } from '@reduxjs/toolkit';

import { StatusApi } from './api/statusApi';
import { appApi } from './api/appApi';
import { authReducer } from '../auth/AuthSlice';

export const store = configureStore({
  reducer: {
    [appApi.reducerPath]: appApi.reducer,
    status: StatusApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(appApi.middleware),

  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
