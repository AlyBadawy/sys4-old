import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithRedux } from '../TestUtils';
import { GetStartedButton } from '../../ui/GetStartedButton';

describe('GetStartedButton', () => {
  it('shows Sign in when not logged in', () => {
    renderWithRedux(<GetStartedButton />);
    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.queryByText('Sign out')).not.toBeInTheDocument();
    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
  });

  it('shows Dashboard in when logged in', () => {
    renderWithRedux(<GetStartedButton />, {}, { auth: { isLoggedIn: true } });
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.queryByText('Sign out')).not.toBeInTheDocument();
    expect(screen.queryByText('Sign in')).not.toBeInTheDocument();
  });

  it('Logout when user is logged in and is in app', () => {
    const location = {
      ...window.location,
      pathname: 'http://localhost/app',
    };
    Object.defineProperty(window, 'location', {
      writable: true,
      value: location,
    });
    renderWithRedux(<GetStartedButton />, {}, { auth: { isLoggedIn: true } });
    expect(screen.getByText('Sign Out')).toBeInTheDocument();
    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
    expect(screen.queryByText('Sign in')).not.toBeInTheDocument();
  });
});
