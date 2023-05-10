import '@testing-library/jest-dom/extend-expect';
import { screen } from '@testing-library/react';
import React from 'react';
import SignIn from '../../auth/SingIn';
import { s4render } from '../TestUtils';

describe('Sing In page with a confirmed Email', () => {
  it('Shows a confirmation message on email confirmed', async () => {
    const location = {
      ...window.location,
      search: '?confirmed=true',
    };
    Object.defineProperty(window, 'location', {
      writable: true,
      value: location,
    });
    s4render(<SignIn />);
    expect(
      await screen.findByText('Your email has been confirmed. Please sign in.')
    ).toBeInTheDocument();
  });
});
