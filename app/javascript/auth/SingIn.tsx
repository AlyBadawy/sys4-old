import React, { useEffect } from 'react';
import { AuthFormAction, AuthForm } from './AuthForm';
import { toast } from 'react-toastify';

export const SignIn = () => {
  const queryParameters = new URLSearchParams(window.location.search);
  const confirmed = queryParameters.get('confirmed');

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

  return <AuthForm action={AuthFormAction.Login} />;
};
