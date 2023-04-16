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
    register: builder.mutation<User, UserLoginData>({
      query: (credential: UserLoginData) => ({
        url: '/users/',
        method: 'POST',
        body: { user: { ...credential } },
      }),
    }),
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
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/users/sign_out',
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } =
  AuthApi;
