import React from 'react';
import { act, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithRedux } from '../TestUtils';
import { GetStartedButton } from '../../ui/GetStartedButton';
import fetchMock from 'fetch-mock';

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

  it('Logout when user is logged in and is in app', async () => {
    const location = {
      ...window.location,
      pathname: 'http://localhost/app',
    };
    Object.defineProperty(window, 'location', {
      writable: true,
      value: location,
    });
    const mocker = fetchMock.delete('/api/users/sign_out', {});
    renderWithRedux(<GetStartedButton />, {}, { auth: { isLoggedIn: true } });
    expect(screen.getByText('Sign Out')).toBeInTheDocument();
    act(() => {
      screen.getByText('Sign Out').click();
    });
    await waitFor(() => {
      expect(mocker.called('/api/users/sign_out')).toBe(true);
    });
    fetchMock.reset();
  });
});
