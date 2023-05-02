import {
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { BaseQueryApi } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { logOut, setUser } from '../slices/UserSlice';
import { RootState } from '../store';

const baseQuery = fetchBaseQuery({
  baseUrl: '/api',
  prepareHeaders: (headers, { getState }) => {
    headers.set('JWT-AUD', 'test');
    const token = (getState() as RootState).user.jwtToken;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithAuth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: Record<string, unknown>
) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    api.dispatch(logOut());
    return result;
  }

  const state = api.getState() as RootState;
  const id = state.user.id;
  const email = state.user.email;
  const jwtToken = state.user.jwtToken;

  if (
    (!id || !email) &&
    (args as FetchArgs).url !== '/users/sign_in' &&
    (args as FetchArgs).url !== '/users/sign_out'
  ) {
    const result = await baseQuery('/account/me', api, extraOptions);
    if (result?.data) {
      const { id, email } = result.data as unknown as {
        id: string;
        email: string;
      };
      api.dispatch(setUser({ id, email, jwtToken }));
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};

export const appApi = createApi({
  baseQuery: baseQueryWithAuth,
  endpoints: (_builder) => ({}),
});
