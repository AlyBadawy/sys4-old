import React from 'react';
import { useFlipper } from '../hooks/useFlipper';
import { AuthForm, AuthFormAction } from './AuthForm';
import { Sys4Text } from '../components/ui/Sys4Text';

export const SignUp = () => {
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

  return <AuthForm action={AuthFormAction.Register} />;
};
