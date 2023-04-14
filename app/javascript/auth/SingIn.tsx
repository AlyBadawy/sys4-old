import React from 'react';
import { AuthFormAction, AuthForm } from './AuthForm';

export const SignIn = () => {
  return <AuthForm action={AuthFormAction.Login} />;
};
