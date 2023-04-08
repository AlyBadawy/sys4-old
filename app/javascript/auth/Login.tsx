import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import { useLoginMutation } from './AuthApi';
import { setCredentials } from './AuthSlice';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const [login, { isLoading, error }] = useLoginMutation();

  const dispatch = useAppDispatch();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await login({ email, password })
      .unwrap()
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
  };

  const loginContent = (
    <form
      onSubmit={(e) => {
        void handleSubmit(e);
      }}
    >
      <main className='container mx-auto h-screen flex flex-col'>
        <div className='border border-cyan-800 animate-pulse bg-cyan-900 opacity-70 mx-5 m-auto flex flex-col p-10 rounded-lg shadow-lg space-y-6 min-w-sm md:w-1/2 md:mx-auto items-center'>
          <img src='/images/sys4-logo.svg' className='w-1/2' />
          <h3 className='text-xl font-bold'>Login To your Account!</h3>
          <input
            type='email'
            id='email'
            placeholder='iLove@sys4.dev'
            required
            className='flex-1 p-2 px-4 rounded-full outline-none focus:border-transparent text-gray-800 h-10'
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <div className='flex flex-col'>
            <input
              type='password'
              id='password'
              placeholder='Password'
              required
              className='flex-1 p-2 px-4 rounded-full outline-none focus:border-transparent text-gray-800 h-10'
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <p className='m-0 mb-4 ml-4 text-sm'>
              <Link to='#' className='text-gray-300'>
                Forgot your password?
              </Link>
            </p>
          </div>
          <button
            className={`bg-logoPrimary hover:bg-blue-700 text-logoSecondary font-bold py-2 px-4 rounded-full disabled:opacity-50 disabled:hover:bg-logoPrimary disabled:cursor-not-allowed ${
              isLoading ? 'cursor-progress disabled:cursor-progress' : ''
            }`}
            type='submit'
            disabled={isLoading || !email || !password}
          >
            Login{' '}
            {isLoading && (
              <img src='/images/ui/spinner.svg' className='inline' />
            )}
          </button>
          <p className='text-red-400'>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access */}
            {error && ((error as any).data?.error || 'something went wrong!')}
          </p>
          <p className='text-sm'>
            Do not have an account?{' '}
            <Link to='#' className='text-gray-300'>
              <span>Sign up now!</span>
            </Link>
          </p>
        </div>
      </main>
    </form>
  );

  return loginContent;
};
