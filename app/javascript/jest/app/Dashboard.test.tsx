import React from 'react';
import fetchMock from 'fetch-mock';
import { s4render } from '../TestUtils';
import Dashboard from '../../app/dashboard/Dashboard';
import { screen, waitFor } from '@testing-library/react';

describe('Dashboard', () => {
  it('shows the status', async () => {
    fetchMock.get('/api/account/me', {});
    const mocker = fetchMock.get('/api/status/user', {
      email: 'test@test.com',
    });
    s4render(<Dashboard />, {}, { user: { isLoggedIn: true } });
    await waitFor(() => {
      expect(mocker.called('/api/status/user')).toBe(true);
    });
    expect(
      await screen.findByText('Status is: test@test.com!')
    ).toBeInTheDocument();
    fetchMock.reset();
  });
  it('handles errors in api', async () => {
    fetchMock.get('/api/account/me', {});
    const mocker = fetchMock.get('/api/status/user', 500);
    s4render(<Dashboard />, {}, { user: { isLoggedIn: true } });
    await waitFor(() => {
      expect(mocker.called('/api/status/user')).toBe(true);
    });
    expect(await screen.findByText('Error!')).toBeInTheDocument();
    fetchMock.reset();
  });
});
