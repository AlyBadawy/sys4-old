import React, { useEffect } from 'react';
import { AuthFormAction, AuthForm } from './AuthForm';
import { toast } from 'react-toastify';

export const SignIn = () => {
  const queryParameters = new URLSearchParams(window.location.search);
  const isConfirmed = queryParameters.get('confirmed') === 'true';

  useEffect(() => {
    if (isConfirmed) {
      toast.success('Your email has been confirmed. Please sign in.', {
        toastId: 'emailConfirmed',
      });
    }
  }, [isConfirmed]);

  return <AuthForm action={AuthFormAction.Login} />;
};
