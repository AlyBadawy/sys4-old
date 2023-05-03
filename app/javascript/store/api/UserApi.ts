/* eslint-disable @typescript-eslint/naming-convention */
import { User } from '../../types/User';
import { appApi } from './appApi';

type UserLoginData = Pick<User, 'email' | 'password'> & {resetPasswordToken?: string};

const apiWithTag = appApi.enhanceEndpoints({ addTagTypes: ['User'] });

export const UserApi = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<User, UserLoginData>({
      query: (credential: UserLoginData) => ({
        url: '/users/',
        method: 'POST',
        body: { user: { ...credential } },
      }),
      invalidatesTags: ['User'],
    }),

    login: builder.mutation<User, UserLoginData>({
      query: (credential: UserLoginData) => ({
        url: '/users/sign_in',
        method: 'POST',
        body: { user: { ...credential } },
      }),
      invalidatesTags: ['User'],
      transformResponse: (response: User, meta) => {
        return {
          ...response,
          jwtToken:
            meta?.response?.headers.get('Authorization')?.split(' ')[1] || '',
        };
      },
      async onQueryStarted(_user, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            UserApi.util.updateQueryData('getUser', undefined, (draft) => {
              Object.assign(draft, data);
            })
          );
        } catch (_error) {
          // do nothing
        }
      },
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/users/sign_out',
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),

    forgotPassword: builder.mutation<void, User>({
      query: ({email}) => ({
        url: '/users/password',
        method: 'POST',
        body: { user: { email } },
      }),
    }),
    
    resetPassword: builder.mutation<void, UserLoginData>({
      query: ({ password, resetPasswordToken }) => ({
        url: '/users/password',
        method: 'PUT',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        body: { user: { password, reset_password_token: resetPasswordToken } },
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
      async onQueryStarted(_user, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            UserApi.util.updateQueryData('getUser', undefined, (draft) => {
              Object.assign(draft, data);
            })
          );
        } catch (_error) {
          // do nothing
        }
      },
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
