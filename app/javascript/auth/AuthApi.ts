import { appApi } from '../store/api/appApi';

type UserLoginData = {
  email: string;
  password: string;
};

type User = {
  id: string;
  email: string;
  admin: boolean;
  JwtToken?: string;
};

export const AuthApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<User, UserLoginData>({
      query: (credential: UserLoginData) => ({
        url: '/users/sign_in',
        method: 'POST',
        body: { user: { ...credential } },
      }),
      transformResponse: (response: User, meta) => {
        return {
          ...response,
          JwtToken:
            meta?.response?.headers.get('Authorization')?.split(' ')[1] || '',
        };
      },
    }),
  }),
});

export const { useLoginMutation } = AuthApi;
