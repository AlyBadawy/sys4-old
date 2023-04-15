import React from 'react';
import { useFlipper } from '../hooks/useFlipper';
import { AuthForm, AuthFormAction } from './AuthForm';

export const SignUp = () => {
  const registerAllowed = useFlipper('register');

  if (!registerAllowed) {
    return <>Registration not allowed!</>;
  }

  return <AuthForm action={AuthFormAction.Register} />;
};
