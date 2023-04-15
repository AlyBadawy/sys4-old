import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useLoginMutation, useRegisterMutation } from './AuthApi';
import { useAppDispatch } from '../store/hooks';
import { setCredentials } from './AuthSlice';

export enum AuthFormAction {
  Register = 'register',
  Login = 'login',
}

type Props = {
  action: AuthFormAction;
};

export const AuthForm = ({ action }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const [register, { isLoading: isRegisterLoading, error: registerError }] =
    useRegisterMutation();
  const [login, { isLoading: isLoginLoading, error: loginError }] =
    useLoginMutation();

  const dispatch = useAppDispatch();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (action === AuthFormAction.Register) {
      await toast.promise(
        register({ email, password }).unwrap(),
        {
          pending: 'Registering...',
          success:
            'Yay! You are registered! Check your email for a confirmation link.',
          error: 'There was an error registering.',
        },
        {
          toastId: 'register',
        }
      );
    }

    if (action === AuthFormAction.Login) {
      await toast
        .promise(
          login({ email, password }).unwrap(),
          {
            pending: 'Signing in...',
            success: 'Hi! Welcome back! 👋',
            error: 'There was an error signing in.',
          },
          {
            toastId: 'login',
          }
        )
        .then((res) => {
          dispatch(
            setCredentials({
              userId: res.id,
              jwtToken: res.JwtToken,
              email: res.email,
              isLoggedIn: true,
            })
          );
          navigate('/app');
        });
    }
  };

  return (
    <form
      className='flex flex-col space-y-6 mx-5 m-auto'
      onSubmit={(e) => {
        void handleSubmit(e);
      }}
    >
      <div className='border border-cyan-800 animate-pulse bg-cyan-900 opacity-70 mx-5 m-auto flex flex-col p-10 rounded-lg shadow-lg space-y-6 min-w-sm md:w-1/2 md:mx-auto items-center'>
        <img src='/images/sys4-logo.svg' className='w-1/2' />
        <h3 className='text-xl font-bold'>
          {action === AuthFormAction.Register
            ? 'Create a new account!'
            : 'Login to your account!'}
        </h3>
        <input
          type='email'
          id='email'
          placeholder='iLove@sys4.dev'
          required
          className='flex-1 p-2 px-2 rounded-full outline-none focus:border-transparent text-gray-800 h-10 w-full md:w-fit placeholder:pl-1'
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <div className='flex flex-col '>
          <input
            type='password'
            id='password'
            placeholder='Password'
            required
            className='flex-1 p-2 px-2 rounded-full outline-none focus:border-transparent text-gray-800 h-10 w-full md:w-fit placeholder:pl-1'
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>
        <button
          className={
            'bg-logoPrimary hover:bg-blue-700 text-logoSecondary font-bold py-2 px-4 rounded-full disabled:opacity-50 disabled:hover:bg-logoPrimary disabled:cursor-not-allowed'
          }
          type='submit'
          disabled={isRegisterLoading || isLoginLoading || !email || !password}
        >
          {action === AuthFormAction.Register ? 'Sign up ' : 'Sign in '}
        </button>
        <p className='text-red-400 text-center'>
          {registerError &&
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
            ((registerError as any).data?.message || 'something went wrong!')}
          {loginError &&
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
            ((loginError as any).data?.error || 'something went wrong!')}
        </p>

        {action === AuthFormAction.Register && (
          <p className='text-sm'>
            Already have an account?{' '}
            <Link to='/sign_in' className='text-gray-300'>
              <span>Sign in now!</span>
            </Link>
          </p>
        )}
        {action === AuthFormAction.Login && (
          <p className='text-sm'>
            Don&apos;t have an account?{' '}
            <Link to='/sign_up' className='text-gray-300'>
              <span>Sign up now!</span>
            </Link>
          </p>
        )}
      </div>
    </form>
  );
};