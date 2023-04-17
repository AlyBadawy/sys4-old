import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithRedux } from '../TestUtils';
import { SignIn } from '../../auth/SingIn';

describe('Sign Up', () => {
  it('Shows Sing in page', () => {
    renderWithRedux(<SignIn />);
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const title = screen.getByText('Sign in to your account!');
    expect(title).toBeInTheDocument();
    const button = screen.getByRole('button', { name: /Sign In/i });
    expect(button).toBeInTheDocument();
  });
});
