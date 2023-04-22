import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useForgotPasswordMutation } from '../store/api/AuthApi';
import { AuthViewsForm } from './AuthViewsForm';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await toast.promise(
      forgotPassword({ email }).unwrap(),
      {
        pending: 'Resetting password...',
        success: 'Check your email for a password reset link.',
        error: 'There was an error resetting your password.',
      },
      {
        toastId: 'forgot-password',
      }
    );
  };

  return (
    <AuthViewsForm title='Forgot your Password?' onSubmit={handleSubmit}>
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
      <button className={'s4-btn'} type='submit' disabled={isLoading || !email}>
        Forgot Password
      </button>
    </AuthViewsForm>
  );
};
