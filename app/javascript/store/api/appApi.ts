import {
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { BaseQueryApi } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { logOut, setCredentials } from '../slices/AuthSlice';
import { RootState } from '../store';

const baseQuery = fetchBaseQuery({
  baseUrl: '/api',
  prepareHeaders: (headers, { getState }) => {
    headers.set('JWT-AUD', 'test');
    const token = (getState() as RootState).auth.jwtToken;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReAuth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: Record<string, unknown>
) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    api.dispatch(logOut());
  }

  const state = api.getState() as RootState;
  const userId = state.auth.userId;
  const email = state.auth.email;
  const jwtToken = state.auth.jwtToken;
  if (!userId || !email) {
    const result = await baseQuery('/account/me', api, extraOptions);
    if (result?.data) {
      api.dispatch(setCredentials({ userId, email, jwtToken }));
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};

export const appApi = createApi({
  baseQuery: baseQueryWithReAuth,
  endpoints: (_builder) => ({}),
});
