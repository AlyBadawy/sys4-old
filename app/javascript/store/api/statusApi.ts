import { User } from '../../types/User';
import { appApi } from './appApi';

export const StatusApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getStatus: builder.query<User, void>({
      query: () => '/status/user',
      keepUnusedDataFor: 3600,
    }),
  }),
});

export const { useGetStatusQuery } = StatusApi;
