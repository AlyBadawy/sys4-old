import React from 'react';
import { s4render } from '../TestUtils';
import { act, screen, waitFor } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import { User } from '../../types/User';
import { PasswordSettings } from '../../app/account/PasswordSettings';
import userEvent from '@testing-library/user-event';

const user: User = {
  id: 'test',
  email: 'test@test.com',
  firstName: 'john',
  lastName: 'smith',
  createdAt: '2023-04-26T11:39:08.148Z',
};

describe('PasswordSettings', () => {
  it('renders correctly', () => {
    fetchMock.get('/api/account/me', user);
    s4render(<PasswordSettings />);
    expect(screen.getByText('Change Password')).toBeInTheDocument();
    fetchMock.reset();
  });

  it('Changes the input values', async () => {
    fetchMock.get('/api/account/me', user);
    s4render(<PasswordSettings />);
    await userEvent.type(screen.getByLabelText('Current password:'), 'old');
    await userEvent.type(screen.getByLabelText('New password:'), 'new');
    await userEvent.type(screen.getByLabelText('Confirm password:'), 'new');
    expect(screen.getByLabelText('Current password:')).toHaveValue('old');
    expect(screen.getByLabelText('New password:')).toHaveValue('new');
    expect(screen.getByLabelText('Confirm password:')).toHaveValue('new');
    fetchMock.reset();
  });
  it('makes an API call to update password', async () => {
    fetchMock.get('/api/account/me', user);
    const mocker = fetchMock.put('/api/users/', user);
    s4render(<PasswordSettings />);
    await userEvent.type(screen.getByLabelText('Current password:'), 'old');
    await userEvent.type(screen.getByLabelText('New password:'), 'new');
    await userEvent.type(screen.getByLabelText('Confirm password:'), 'new');
    act(() => screen.getByText('Save').click());
    await waitFor(() => expect(mocker.called('/api/users/')).toBeTruthy());
    fetchMock.reset();
  });
  it('shows a message when password update failed', async () => {
    fetchMock.get('/api/account/me', user);
    const mocker = fetchMock.put('/api/users/', {
      status: 500,
      body: { message: 'Incorrect current password' },
    });
    s4render(<PasswordSettings />);
    await userEvent.type(screen.getByLabelText('Current password:'), 'old');
    await userEvent.type(screen.getByLabelText('New password:'), 'new');
    await userEvent.type(screen.getByLabelText('Confirm password:'), 'new');
    act(() => screen.getByText('Save').click());
    await waitFor(() => expect(mocker.called('/api/users/')).toBeTruthy());
    expect(
      await screen.findByText(/Incorrect current password/i)
    ).toBeInTheDocument();
    fetchMock.reset();
  });
  it('shows a default message when password update failed', async () => {
    fetchMock.get('/api/account/me', user);
    const mocker = fetchMock.put('/api/users/', 500);
    s4render(<PasswordSettings />);
    await userEvent.type(screen.getByLabelText('Current password:'), 'old');
    await userEvent.type(screen.getByLabelText('New password:'), 'new');
    await userEvent.type(screen.getByLabelText('Confirm password:'), 'new');
    act(() => screen.getByText('Save').click());
    await waitFor(() => expect(mocker.called('/api/users/')).toBeTruthy());
    expect(
      await screen.findByText(/Something went wrong/i)
    ).toBeInTheDocument();
    fetchMock.reset();
  });
});
