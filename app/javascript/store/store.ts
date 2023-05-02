import {
  configureStore,
  PreloadedState,
  combineReducers,
} from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { StatusApi } from './api/statusApi';
import { appApi } from './api/appApi';
import { layoutReducer } from './slices/LayoutSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { userReducer } from './slices/UserSlice';
import { middlewares } from './middlewares';

export const rootReducer = combineReducers({
  [appApi.reducerPath]: appApi.reducer,
  status: StatusApi.reducer,
  user: userReducer,
  layout: layoutReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }).concat(middlewares),
  });

const store = setupStore();

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
