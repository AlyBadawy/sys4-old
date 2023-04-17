import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { SignUp } from '../../auth/SignUp';
import { renderWithRedux } from '../TestUtils';

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
