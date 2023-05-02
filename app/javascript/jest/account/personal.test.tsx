import React from 'react';
import { s4render } from '../TestUtils';
import { act, screen, waitFor } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import { User } from '../../types/User';
import { PersonalSettings } from '../../app/account/PersonalSettings';
import userEvent from '@testing-library/user-event';

const user: User = {
  id: 'test',
  email: 'test@test.com',
  firstName: 'john',
  lastName: 'smith',
  createdAt: new Date('2023-04-26T11:39:08.148Z'),
};

describe('PersonalSettings', () => {
  it('renders correctly', async () => {
    fetchMock.get('/api/account/me', user);
    s4render(<PersonalSettings />);
    expect(screen.getByText('Personal Information')).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.getByLabelText('First name:')).toHaveValue('john')
    );
    await waitFor(() =>
      expect(screen.getByLabelText('Last name:')).toHaveValue('smith')
    );
    await waitFor(() =>
      expect(screen.getByLabelText('Email:')).toHaveValue('test@test.com')
    );
    fetchMock.reset();
  });
  it('shows a message for unconfirmed email', async () => {
    fetchMock.get('/api/account/me', {
      ...user,
      unconfirmedEmail: 'notYet@test.com',
    });
    s4render(<PersonalSettings />);
    expect(screen.getByText('Personal Information')).toBeInTheDocument();
    expect(
      await screen.findByText(/Your email is unconfirmed/i)
    ).toBeInTheDocument();
    fetchMock.reset();
  });

  it('shows a message for error loading', async () => {
    fetchMock.get('/api/account/me', 500);
    s4render(<PersonalSettings />);
    expect(screen.getByText('Personal Information')).toBeInTheDocument();
    expect(
      await screen.findByText(/Something went wrong!/i)
    ).toBeInTheDocument();
    fetchMock.reset();
  });

  it('updates user info', async () => {
    const meMocker = fetchMock.get('/api/account/me', user);
    const mocker = fetchMock.put('/api/users/', user);
    s4render(<PersonalSettings />);
    expect(screen.getByText('Personal Information')).toBeInTheDocument();
    await userEvent.type(screen.getByLabelText('Current password:'), 'old');
    act(() => screen.getByText('Save').click());
    await waitFor(() => expect(meMocker.called('/api/account/me')).toBe(true));
    await waitFor(() => expect(mocker.called('/api/users/')).toBe(true));
    await waitFor(() =>
      expect(meMocker.calls('/api/account/me')).toHaveLength(2)
    );
    fetchMock.reset();
  });
  it('shows a message when password update failed', async () => {
    fetchMock.get('/api/account/me', user);
    const mocker = fetchMock.put('/api/users/', 500);
    s4render(<PersonalSettings />);
    await userEvent.type(screen.getByLabelText('Current password:'), 'old');
    act(() => screen.getByRole('button', { name: 'Save' }).click());
    await waitFor(() => expect(mocker.called('/api/users/')).toBe(true));
    expect(
      await screen.findByText(/Something went wrong/i)
    ).toBeInTheDocument();
    fetchMock.reset();
  });
});
