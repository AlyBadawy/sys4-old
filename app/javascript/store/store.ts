import {
  configureStore,
  PreloadedState,
  combineReducers,
} from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { StatusApi } from './api/statusApi';
import { appApi } from './api/appApi';
import { authReducer } from '../auth/AuthSlice';

export const rootReducer = combineReducers({
  [appApi.reducerPath]: appApi.reducer,
  status: StatusApi.reducer,
  auth: authReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }).concat(appApi.middleware),
  });

const store = setupStore();

setupListeners(store.dispatch);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch'];
