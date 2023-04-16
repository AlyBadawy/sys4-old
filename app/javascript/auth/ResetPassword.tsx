import React from 'react';
import { AuthForm, AuthFormAction } from './AuthForm';

export const ResetPassword = () => {
  return <AuthForm action={AuthFormAction.ResetPassword} />;
};
