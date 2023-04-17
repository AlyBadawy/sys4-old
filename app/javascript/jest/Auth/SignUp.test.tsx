import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { SignUp } from '../../auth/SignUp';

describe('Sign Up', () => {
  it('Shows registeration disabled by default', () => {
    render(<SignUp />);
    const title = screen.getByText('Registration is currently disabled!');
    expect(title).toBeInTheDocument();
    const paragraph = screen.getByText(
      /Registration for new users is currently disabled./i
    );
    expect(paragraph).toBeInTheDocument();
  });

  it.skip('Shows registeration page when flipper enabled', () => {
    window.FLIPPERS = { register: true };
    render(<SignUp />);
    const title = screen.getByText('Registration is currently disabled!');
    expect(title).toBeInTheDocument();
    const paragraph = screen.getByText(
      /Registration for new users is currently disabled./i
    );
    expect(paragraph).toBeInTheDocument();
  });
});
