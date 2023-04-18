import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { SignUp } from '../../auth/SignUp';
import { renderWithRedux } from '../TestUtils';
import { SignIn } from '../../auth/SingIn';
import { ForgotPassword } from '../../auth/ForgotPassword';
import { ResetPassword } from '../../auth/ResetPassword';

describe('Auth Views', () => {
  describe('Sign Up', () => {
    it('Shows registration disabled by default', () => {
      renderWithRedux(<SignUp />);
      const title = screen.getByText('Registration is currently disabled!');
      expect(title).toBeInTheDocument();
      const paragraph = screen.getByText(
        /Registration for new users is currently disabled./i
      );
      expect(paragraph).toBeInTheDocument();
    });

    it('Shows registration page when flipper enabled', () => {
      renderWithRedux(<SignUp />, { register: true });
      // eslint-disable-next-line testing-library/prefer-screen-queries
      const title = screen.getByText('Create a new account!');
      expect(title).toBeInTheDocument();
      const button = screen.getByRole('button', { name: /Sign Up/i });
      expect(button).toBeInTheDocument();
    });
  });

  describe('Sign In', () => {
    it('Shows Sing in page', () => {
      renderWithRedux(<SignIn />);
      // eslint-disable-next-line testing-library/prefer-screen-queries
      const title = screen.getByText('Sign in to your account!');
      expect(title).toBeInTheDocument();
      const button = screen.getByRole('button', { name: /Sign In/i });
      expect(button).toBeInTheDocument();
    });
  });
  describe('Forgot Password', () => {
    it('Shows Forgot password page', () => {
      renderWithRedux(<ForgotPassword />);
      // eslint-disable-next-line testing-library/prefer-screen-queries
      const title = screen.getByText('Forgot your Password?');
      expect(title).toBeInTheDocument();
      const button = screen.getByRole('button', { name: /Forgot Password/i });
      expect(button).toBeInTheDocument();
    });
  });
  describe('Reset Password', () => {
    it('Shows reset password page', () => {
      renderWithRedux(<ResetPassword />);
      // eslint-disable-next-line testing-library/prefer-screen-queries
      const title = screen.getByText('Reset your Password!');
      expect(title).toBeInTheDocument();
      const button = screen.getByRole('button', { name: /Reset Password/i });
      expect(button).toBeInTheDocument();
    });
  });
});
