// PACKAGES
import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

// AUTH
import SignIn from '../../auth/SingIn';

// TESTUTILS';
import { s4render } from '../TestUtils';

// TESTS
describe('Sing In page with a confirmed Email Error', () => {
  it('Shows a error message on email confirmed error', async () => {
    // delete window;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, no-global-assign
    window = Object.create(window);
    const location = {
      ...window.location,
      search: '?confirmed=confirmationError',
    };
    Object.defineProperty(window, 'location', {
      writable: true,
      value: location,
    });
    s4render(<SignIn />);
    expect(await screen.findByText('confirmationError')).toBeInTheDocument();
  });
});
