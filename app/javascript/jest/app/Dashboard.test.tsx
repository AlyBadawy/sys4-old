import React from 'react';
import fetchMock from 'fetch-mock';
import { renderWithRedux } from '../TestUtils';
import { Dashboard } from '../../app/dashboard/Dashboard';
import { screen, waitFor } from '@testing-library/react';

describe('Dashboard', () => {
  it('shows the status', async () => {
    fetchMock.mock('/api/account/me', {});
    const mocker = fetchMock.mock('/api/status/user', {
      email: 'test@test.com',
    });
    renderWithRedux(<Dashboard />, {}, { auth: { isLoggedIn: true } });
    await waitFor(() => {
      expect(mocker.called('/api/status/user')).toBe(true);
    });
    expect(
      await screen.findByText('Status is: test@test.com!')
    ).toBeInTheDocument();
    fetchMock.reset();
  });
  it('handles errors in api', async () => {
    fetchMock.mock('/api/account/me', {});
    const mocker = fetchMock.mock('/api/status/user', 500);
    renderWithRedux(<Dashboard />, {}, { auth: { isLoggedIn: true } });
    await waitFor(() => {
      expect(mocker.called('/api/status/user')).toBe(true);
    });
    expect(await screen.findByText('Error!')).toBeInTheDocument();
    fetchMock.reset();
  });
});
