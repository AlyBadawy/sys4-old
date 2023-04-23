import { Session } from '../../types/Session';
import { appApi } from './appApi';

const apiWithTag = appApi.enhanceEndpoints({ addTagTypes: ['Session'] });

export const SessionsApi = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getSessions: builder.query<Session[], void>({
      query: () => ({
        url: '/account/allowlisted_jwts',
        method: 'GET',
      }),
      providesTags: ['Session'],
    }),
    getSessionById: builder.query<Session, { id: string }>({
      query: ({ id }) => ({
        url: `/account/allowlisted_jwts/${id}`,
        method: 'GET',
      }),
      providesTags: ['Session'],
    }),
    invokeSession: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/account/allowlisted_jwts/${id}`,
        method: 'PUT',
      }),
      invalidatesTags: ['Session'],
    }),
    deleteSession: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/account/allowlisted_jwts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Session'],
    }),
  }),
});

export const {
  useGetSessionsQuery,
  useGetSessionByIdQuery,
  useInvokeSessionMutation,
  useDeleteSessionMutation,
} = SessionsApi;
