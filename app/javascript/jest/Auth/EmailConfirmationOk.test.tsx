// PACKAGES
import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

// AUTH
import SignIn from '../../auth/SingIn';

// TESTUTILS';
import { s4render } from '../TestUtils';

// TESTS
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
