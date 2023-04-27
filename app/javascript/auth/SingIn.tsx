import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useLoginMutation } from '../store/api/UserApi';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/store';
import { setCredentials } from '../store/slices/AuthSlice';
import { AuthViewsForm } from './AuthViewsForm';
import { PasswordField } from '../ui/PasswordField';

export const SignIn = () => {
  const queryParameters = new URLSearchParams(window.location.search);
  const confirmed = queryParameters.get('confirmed');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [login, { data, isLoading, error }] = useLoginMutation();

  useEffect(() => {
    if (confirmed === 'true') {
      toast.success('Your email has been confirmed. Please sign in.', {
        toastId: 'emailConfirmedOk',
      });
    } else if (confirmed) {
      toast.error(confirmed, {
        toastId: 'emailConfirmedError',
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
      })
      .catch(() => {
        // do nothing
      });
  };
  return (
    <AuthViewsForm title='Sign in to your account!' onSubmit={handleSubmit}>
      <input
        type='email'
        id='email'
        data-testid='email'
        placeholder='iLove@sys4.dev'
        required
        className='s4-input rounded-full'
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />
      <PasswordField
        id='password'
        placeholder='Password'
        required
        onChange={(e) => setPassword(e.target.value)}
        fullRound={true}
      />
      <Link
        to='/forgot_password'
        className='text-stone-300 px-2 text-sm self-start'
      >
        <span>Forgot password?</span>
      </Link>
      <button
        className={'s4-btn'}
        type='submit'
        disabled={isLoading || !email || !password || !!data}
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
