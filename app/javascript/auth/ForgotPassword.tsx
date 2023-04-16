import React from 'react';
import { AuthForm, AuthFormAction } from './AuthForm';

export const ForgotPassword = () => {
  return <AuthForm action={AuthFormAction.ForgotPassword} />;
};
