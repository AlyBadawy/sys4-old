import {
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { BaseQueryApi } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { logOut } from '../slices/UserSlice';
import { RootState } from '../store';
import { toast } from 'react-toastify';

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
  if (result.error?.status === 500 || result.error?.status === 'PARSING_ERROR') {
    toast.error('There was an error with the server; please try again later', {
      toastId: 'serverError',
    });
  }
  if (result.error?.status === 'TIMEOUT_ERROR' || result.error?.status === 'FETCH_ERROR' ) {
    toast.error('You seem to be disconnected from the Internet; please try again later', {
      toastId: 'fetchError',
    });
  }

  return result;
};

export const appApi = createApi({
  baseQuery: baseQueryWithAuth,
  endpoints: (_builder) => ({}),
});
