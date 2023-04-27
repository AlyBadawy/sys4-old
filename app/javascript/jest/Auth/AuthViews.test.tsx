import React from 'react';
import { screen, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import fetchMock from 'fetch-mock';
import userEvent from '@testing-library/user-event';
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
    it('signs up a user', async () => {
      fetchMock.mock('/api/account/me', 200);
      fetchMock.mock('/api/users/', {
        id: 'test',
        email: 'success@example.com',
      });
      renderWithRedux(<SignUp />, { register: true });
      await screen.findByText('Create a new account!');
      await userEvent.type(screen.getByTestId('email'), 'test@test.com');
      await userEvent.type(screen.getByTestId('password-test'), 'password');
      act(() => screen.getByText(/Sign up/i).click());
      expect(await screen.findByText(/Sign up/i)).toBeDisabled();
      expect(
        await screen.findByText(/Check your email for a confirmation link!/i)
      ).toBeInTheDocument();
      fetchMock.reset();
    });
    it('shows a default error on api failure', async () => {
      fetchMock.mock('/api/account/me', 200);
      fetchMock.mock('/api/users/', 500);
      renderWithRedux(<SignUp />, { register: true });
      await screen.findByText('Create a new account!');
      await userEvent.type(screen.getByTestId('email'), 'test@test.com');
      await userEvent.type(screen.getByTestId('password-test'), 'password');
      act(() => screen.getByText(/Sign up/i).click());
      expect(
        await screen.findByText(/something went wrong!/i)
      ).toBeInTheDocument();
      fetchMock.reset();
    });
    it('shows an error message on api failure', async () => {
      fetchMock.mock('/api/account/me', 200);
      fetchMock.mock('/api/users/', {
        status: 500,
        body: { error: 'Email is invalid' },
      });
      renderWithRedux(<SignUp />, { register: true });
      await screen.findByText('Create a new account!');
      await userEvent.type(screen.getByTestId('email'), 'test@test.com');
      await userEvent.type(screen.getByTestId('password-test'), 'password');
      act(() => screen.getByText(/Sign up/i).click());
      expect(await screen.findByText(/Email is invalid/i)).toBeInTheDocument();
      fetchMock.reset();
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
    it('signs in a user', async () => {
      fetchMock.mock('/api/account/me', 200);
      fetchMock.mock('/api/users/sign_in', {
        id: 'test',
        email: 'success@example.com',
      });
      renderWithRedux(<SignIn />, { register: true });
      await screen.findByText('Sign in to your account!');
      await userEvent.type(screen.getByTestId('email'), 'test@test.com');
      await userEvent.type(screen.getByTestId('password-test'), 'password');
      act(() => screen.getByText('Sign in').click());
      expect(await screen.findByText('Sign in')).toBeDisabled();
      fetchMock.reset();
    });
    it('shows a default error on api failure', async () => {
      fetchMock.mock('/api/account/me', 200);
      fetchMock.mock('/api/users/sign_in', 500);
      renderWithRedux(<SignIn />, { register: true });
      await screen.findByText('Sign in to your account!');
      await userEvent.type(screen.getByTestId('email'), 'test@test.com');
      await userEvent.type(screen.getByTestId('password-test'), 'password');
      act(() => screen.getByText('Sign in').click());
      expect(
        await screen.findByText(/something went wrong!/i)
      ).toBeInTheDocument();
      fetchMock.reset();
    });
    it('shows an error message on sign in api failure', async () => {
      fetchMock.mock('/api/account/me', 200);
      fetchMock.mock('/api/users/sign_in', {
        status: 500,
        body: { error: 'Email is invalid' },
      });
      renderWithRedux(<SignIn />);
      await screen.findByText('Sign in to your account!');
      await userEvent.type(screen.getByTestId('email'), 'test@test.com');
      await userEvent.type(screen.getByTestId('password-test'), 'password');
      act(() => screen.getByText('Sign in').click());
      expect(await screen.findByText(/Email is invalid/i)).toBeInTheDocument();
      fetchMock.reset();
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
