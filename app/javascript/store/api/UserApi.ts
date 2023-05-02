/* eslint-disable @typescript-eslint/naming-convention */
import { User, UserLoginData } from '../../types/User';
import { appApi } from './appApi';

const apiWithTag = appApi.enhanceEndpoints({ addTagTypes: ['User', 'Session'] });

export const UserApi = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<User, UserLoginData>({
      query: (credential: UserLoginData) => ({
        url: '/users/',
        method: 'POST',
        body: { user: { ...credential } },
      }),
      invalidatesTags: ['User', 'Session'],
    }),

    login: builder.mutation<User, UserLoginData>({
      query: (credential: UserLoginData) => ({
        url: '/users/sign_in',
        method: 'POST',
        body: { user: { ...credential } },
      }),
      invalidatesTags: ['User', 'Session'],
      transformResponse: (response: User, meta) => {
        return {
          ...response,
          jwtToken:
            meta?.response?.headers.get('Authorization')?.split(' ')[1] || '',
        };
      },
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/users/sign_out',
        method: 'DELETE',
      }),
      invalidatesTags: ['User', 'Session'],
    }),

    forgotPassword: builder.mutation<void, { email: string }>({
      query: (email) => ({
        url: '/users/password',
        method: 'POST',
        body: { user: email },
      }),
    }),
    
    resetPassword: builder.mutation<void, { password: string; token: string }>({
      query: ({ password, token }) => ({
        url: '/users/password',
        method: 'PUT',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        body: { user: { password: password, reset_password_token: token } },
      }),
    }),

    updateUser: builder.mutation<User, User>({
      query: (user) => ({
        url: '/users/',
        method: 'PUT',
        body: {
          user: {
            email: user.email,
            first_name: user.firstName,
            last_name: user.lastName,
            current_password: user.currentPassword,
            password: user.password,
            password_confirmation: user.passwordConfirmation,
          },
        },
      }),
      invalidatesTags: ['User'],
    }),

    getUser: builder.query<User, void>({
      query: () => '/account/me',
      keepUnusedDataFor: 3600,
      providesTags: ['User'],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useUpdateUserMutation,
  useGetUserQuery,
} = UserApi;
