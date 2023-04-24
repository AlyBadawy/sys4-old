import React, { useState } from 'react';
import { useFlipper } from '../hooks/useWindow';
import { Sys4Text } from '../ui/Sys4Text';
import { useRegisterMutation } from '../store/api/UserApi';
import { Link } from 'react-router-dom';
import { AuthViewsForm } from './AuthViewsForm';
import { toast } from 'react-toastify';

export const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [register, { isLoading, error }] = useRegisterMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await toast.promise(
      register({ email, password }).unwrap(),
      {
        pending: 'Signing up...',
        success:
          'Yay! You signed up! Check your email for a confirmation link.',
        error: 'There was an error signing up.',
      },
      {
        toastId: 'register',
      }
    );
    setPassword('');
  };

  const registerAllowed = useFlipper('register');
  if (!registerAllowed) {
    return (
      <div className='flex flex-col space-y-6 mx-5 m-auto'>
        <div className='border border-cyan-800 animate-pulse bg-cyan-900 opacity-70 mx-5 m-auto flex flex-col p-10 rounded-lg shadow-lg space-y-6 min-w-sm md:w-1/2 md:mx-auto items-center'>
          <img src='/images/sys4-logo.svg' className='w-1/2' />
          <h3 className='text-xl font-bold'>
            Registration is currently disabled!
          </h3>
          <p className='p-4'>
            Registration for new users is currently disabled.
            <br />
            We apologize for any inconvenience this may cause. Our team at{' '}
            <Sys4Text /> is working on improving the application to ensure a
            better user experience. Please check back later or contact us at
            support@sys4.dev if you have any questions or concerns.
          </p>
        </div>
      </div>
    );
  }

  return (
    <AuthViewsForm title='Create a new account!' onSubmit={handleSubmit}>
      <div className='flex flex-col gap-4'>
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
        className={'s4-btn'}
        type='submit'
        disabled={isLoading || !email || !password}
      >
        {isLoading ? 'Signing up...' : 'Sign up'}
      </button>
      <p className='text-red-400 text-center'>
        {error &&
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
          ((error as any).data?.error || 'something went wrong!')}
      </p>
      <p className='text-sm'>
        Already have an account?{' '}
        <Link to='/sign_in' className='text-gray-300'>
          <span>Sign in now!</span>
        </Link>
      </p>
    </AuthViewsForm>
  );
};
