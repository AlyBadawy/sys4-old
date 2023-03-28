import { appApi } from './appApi';

export const StatusApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getStatus: builder.query<string, void>({
      query: () => '/status/user',
      keepUnusedDataFor: 60,
    }),
  }),
});

export const { useGetStatusQuery } = StatusApi;
