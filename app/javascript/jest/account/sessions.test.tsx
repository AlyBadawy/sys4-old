import React from 'react';
import { SessionsSettings } from '../../app/account/SessionsSettings';
import { renderWithRedux } from '../TestUtils';
import { act, screen, waitFor } from '@testing-library/react';
import { SessionWrapper } from '../../app/account/SessionWrapper';
import { Session } from '../../types/Session';
import fetchMock from 'fetch-mock';

const session: Session = {
  id: 'test',
  current: false,
  createdAt: new Date(),
  agent: 'pc | Mac OSX 10.15.7 | Safari 16.4',
  ip: '127.0.0.1',
  location: 'Planet Earth',
  valid: false,
  jti: 'test',
  url: 'test',
  exp: new Date(),
  deviceType: 'pc',
};

describe('Sessions', () => {
  describe('SessionsSettings', () => {
    it('renders correctly', async () => {
      fetchMock.mock('/api/account/allowlisted_jwts', [
        { ...session, valid: true },
      ]);
      fetchMock.get('/api/account/me', {});

      renderWithRedux(<SessionsSettings />);
      expect(screen.getByText('Your Sessions:')).toBeInTheDocument();
      expect(
        await screen.findByText('pc | Mac OSX 10.15.7 | Safari 16.4')
      ).toBeInTheDocument();

      fetchMock.reset();
    });
  });

  describe('SessionWrapper', () => {
    const session: Session = {
      id: 'test',
      current: false,
      createdAt: new Date(),
      agent: 'pc | Mac OSX 10.15.7 | Safari 16.4',
      ip: '127.0.0.1',
      location: 'Planet Earth',
      valid: false,
      jti: 'test',
      url: 'test',
      exp: new Date(),
      deviceType: 'smartphone',
    };

    it('renders an expired session', () => {
      renderWithRedux(<SessionWrapper session={session} />);
      expect(
        screen.getByText('pc | Mac OSX 10.15.7 | Safari 16.4')
      ).toBeInTheDocument();
      expect(screen.getByText('Planet Earth')).toBeInTheDocument();
      expect(screen.getByText('127.0.0.1')).toBeInTheDocument();
      expect(screen.getByText('Expired')).toBeInTheDocument();
      expect(screen.getByText('Sign out')).toBeDisabled();
    });
    it('renders an active session', () => {
      renderWithRedux(<SessionWrapper session={{ ...session, valid: true }} />);
      expect(
        screen.getByText('pc | Mac OSX 10.15.7 | Safari 16.4')
      ).toBeInTheDocument();
      expect(screen.getByText('Planet Earth')).toBeInTheDocument();
      expect(screen.getByText('127.0.0.1')).toBeInTheDocument();
      expect(screen.getByText('Active')).toBeInTheDocument();
      expect(screen.getByText('Sign out')).toBeEnabled();
    });

    it('invokes the sign out callback', async () => {
      fetchMock.get('/api/account/me', {});
      const mocker = fetchMock.put('/api/account/allowlisted_jwts/test', {
        ...session,
        valid: false,
      });

      renderWithRedux(<SessionWrapper session={{ ...session, valid: true }} />);
      expect(await screen.findByTestId('invoke-session-button')).toBeEnabled();
      act(() => {
        screen.getByTestId('invoke-session-button').click();
      });
      await waitFor(() => {
        expect(mocker.called('/api/account/allowlisted_jwts/test')).toBe(true);
      });
      fetchMock.reset();
    });
    it('invokes the delete callback', async () => {
      fetchMock.get('/api/account/me', {});
      const mocker = fetchMock.delete('/api/account/allowlisted_jwts/test', {});

      renderWithRedux(<SessionWrapper session={{ ...session, valid: true }} />);
      expect(await screen.findByTestId('invoke-session-button')).toBeEnabled();
      act(() => {
        screen.getByTestId('delete-session-button').click();
      });
      await waitFor(() => {
        expect(mocker.called('/api/account/allowlisted_jwts/test')).toBe(true);
      });
      fetchMock.reset();
    });
  });
});
