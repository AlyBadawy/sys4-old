// PACKAGES
import React from 'react';
import { screen, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import fetchMock from 'fetch-mock';
import userEvent from '@testing-library/user-event';

// AUTH
import SignUp from '../../auth/SignUp';
import SignIn from '../../auth/SingIn';
import ForgotPassword from '../../auth/ForgotPassword';
import ResetPassword from '../../auth/ResetPassword';

// TESTUTILS';
import { s4render } from '../TestUtils';

// TESTS
describe('Auth Views', () => {
  describe('Sign Up', () => {
    it('Shows registration disabled by default', () => {
      s4render(<SignUp />);
      const title = screen.getByText('Registration is currently disabled!');
      expect(title).toBeInTheDocument();
      const paragraph = screen.getByText(
        /Registration for new users is currently disabled./i
      );
      expect(paragraph).toBeInTheDocument();
    });

    it('Shows registration page when flipper enabled', () => {
      s4render(<SignUp />, { register: true });
      // eslint-disable-next-line testing-library/prefer-screen-queries
      const title = screen.getByText('Create a new account!');
      expect(title).toBeInTheDocument();
      const button = screen.getByRole('button', { name: /Sign Up/i });
      expect(button).toBeInTheDocument();
    });
    it('signs up a user', async () => {
      fetchMock.get('/api/account/me', 200);
      fetchMock.post('/api/users/', {
        id: 'test',
        email: 'success@example.com',
      });
      s4render(<SignUp />, { register: true });
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
      fetchMock.get('/api/account/me', 200);
      fetchMock.post('/api/users/', 500);
      s4render(<SignUp />, { register: true });
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
      fetchMock.get('/api/account/me', 200);
      fetchMock.post('/api/users/', {
        status: 500,
        body: { error: 'Email is invalid' },
      });
      s4render(<SignUp />, { register: true });
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
      s4render(<SignIn />);
      // eslint-disable-next-line testing-library/prefer-screen-queries
      const title = screen.getByText('Sign in to your account!');
      expect(title).toBeInTheDocument();
      const button = screen.getByRole('button', { name: /Sign In/i });
      expect(button).toBeInTheDocument();
    });
    it('signs in a user', async () => {
      fetchMock.get('/api/account/me', 200);
      fetchMock.post('/api/users/sign_in', {
        id: 'test',
        email: 'success@example.com',
      });
      s4render(<SignIn />);
      await screen.findByText('Sign in to your account!');
      await userEvent.type(screen.getByTestId('email'), 'test@test.com');
      await userEvent.type(screen.getByTestId('password-test'), 'password');
      act(() => screen.getByText('Sign in').click());
      expect(await screen.findByText('Sign in')).toBeDisabled();
      fetchMock.reset();
    });
    it('shows a default error on api failure', async () => {
      fetchMock.get('/api/account/me', 200);
      fetchMock.post('/api/users/sign_in', 500);
      s4render(<SignIn />);
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
      fetchMock.get('/api/account/me', 200);
      fetchMock.post('/api/users/sign_in', {
        status: 500,
        body: { error: 'Email is invalid' },
      });
      s4render(<SignIn />);
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
      s4render(<ForgotPassword />);
      // eslint-disable-next-line testing-library/prefer-screen-queries
      const title = screen.getByText('Forgot your Password?');
      expect(title).toBeInTheDocument();
      const button = screen.getByRole('button', { name: /Forgot Password/i });
      expect(button).toBeInTheDocument();
    });
    it('calls an API to forgot password', async () => {
      fetchMock.get('/api/account/me', 200);
      const mocker = fetchMock.post('/api/users/password', 201);
      s4render(<ForgotPassword />);
      // eslint-disable-next-line testing-library/prefer-screen-queries
      await userEvent.type(screen.getByTestId('email'), 'test@test.com');
      act(() => screen.getByText(/Forgot Password/i).click());
      await waitFor(() =>
        expect(mocker.called('/api/users/password')).toBe(true)
      );
      expect(
        await screen.findByText(/Check your email for a password reset link./i)
      ).toBeInTheDocument();
      fetchMock.reset();
    });
    it('Shows an error message on API failure', async () => {
      fetchMock.get('/api/account/me', 200);
      const mocker = fetchMock.post('/api/users/password', 500);
      s4render(<ForgotPassword />);
      // eslint-disable-next-line testing-library/prefer-screen-queries
      await userEvent.type(screen.getByTestId('email'), 'test@test.com');
      act(() => screen.getByText(/Forgot Password/i).click());
      await waitFor(() =>
        expect(mocker.called('/api/users/password')).toBe(true)
      );
      expect(
        await screen.findByText(/There was an error resetting your password./i)
      ).toBeInTheDocument();
      fetchMock.reset();
    });
  });
  describe('Reset Password', () => {
    it('Shows reset password page', () => {
      s4render(<ResetPassword />);
      // eslint-disable-next-line testing-library/prefer-screen-queries
      const title = screen.getByText('Reset your Password!');
      expect(title).toBeInTheDocument();
      const button = screen.getByRole('button', { name: /Reset Password/i });
      expect(button).toBeInTheDocument();
    });

    it('calls an API to reset password', async () => {
      fetchMock.get('/api/account/me', 200);
      const mocker = fetchMock.put('/api/users/password', 200);
      s4render(<ResetPassword />);
      // eslint-disable-next-line testing-library/prefer-screen-queries
      await userEvent.type(screen.getByTestId('password-test'), 'somePassword');
      act(() => screen.getByText(/Reset Password/i).click());
      await waitFor(() =>
        expect(mocker.called('/api/users/password')).toBe(true)
      );
      expect(
        await screen.findByText(/Password Changed! Please sign in./i)
      ).toBeInTheDocument();
      fetchMock.reset();
    });
    it('Shows an error message on API failure', async () => {
      fetchMock.get('/api/account/me', 200);
      const mocker = fetchMock.put('/api/users/password', 500);
      s4render(<ResetPassword />);
      // eslint-disable-next-line testing-library/prefer-screen-queries
      await userEvent.type(screen.getByTestId('password-test'), '123');
      act(() => screen.getByText(/Reset Password/i).click());
      await waitFor(() =>
        expect(mocker.called('/api/users/password')).toBe(true)
      );
      expect(
        await screen.findByText(/There was an error resetting your password./i)
      ).toBeInTheDocument();
      fetchMock.reset();
    });
  });
});
