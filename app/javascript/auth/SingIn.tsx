import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useLoginMutation } from '../store/api/UserApi';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/store';
import { setCredentials } from '../store/slices/AuthSlice';
import { AuthViewsForm } from './AuthViewsForm';

export const SignIn = () => {
  const queryParameters = new URLSearchParams(window.location.search);
  const confirmed = queryParameters.get('confirmed');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [login, { isLoading, error }] = useLoginMutation();

  useEffect(() => {
    if (confirmed === 'true') {
      toast.success('Your email has been confirmed. Please sign in.', {
        toastId: 'emailConfirmed',
      });
    } else if (confirmed) {
      toast.error(confirmed, {
        toastId: 'emailConfirmed',
      });
    }
  }, [confirmed]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
  };
  return (
    <AuthViewsForm title='Sign in to your account!' onSubmit={handleSubmit}>
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
        <Link to='/forgot_password' className='text-stone-300 px-2 text-sm'>
          <span>Forgot password?</span>
        </Link>
      </div>
      <button
        className={'s4-btn'}
        type='submit'
        disabled={isLoading || !email || !password}
      >
        {isLoading ? 'Signing in...' : 'Sign in'}
      </button>
      <p className='text-red-400 text-center'>
        {error &&
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
          ((error as any).data?.error || 'something went wrong!')}
      </p>
      <p className='text-sm'>
        Don&apos;t have an account?{' '}
        <Link to='/sign_up' className='text-stone-300'>
          <span>Sign up now!</span>
        </Link>
      </p>
    </AuthViewsForm>
  );
};
