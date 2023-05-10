import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useForgotPasswordMutation } from '../store/api/UserApi';
import { AuthViewsForm } from './AuthViewsForm';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await toast
      .promise(
        forgotPassword({ email }).unwrap(),
        {
          pending: 'Resetting password...',
          success: 'Check your email for a password reset link.',
          error: 'There was an error resetting your password.',
        },
        {
          toastId: 'forgot-password',
        }
      )
      .catch(() => {
        // do nothing
      });
  };

  return (
    <AuthViewsForm title='Forgot your Password?' onSubmit={handleSubmit}>
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
      <button className={'s4-btn'} type='submit' disabled={isLoading || !email}>
        Forgot Password
      </button>
    </AuthViewsForm>
  );
};

export default ForgotPassword;
