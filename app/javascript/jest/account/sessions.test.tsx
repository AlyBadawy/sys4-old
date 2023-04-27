import React from 'react';
import { SessionsSettings } from '../../app/account/SessionsSettings';
import { s4render } from '../TestUtils';
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
      fetchMock.get('/api/account/allowlisted_jwts', [
        { ...session, valid: true },
      ]);
      fetchMock.get('/api/account/me', {});

      s4render(<SessionsSettings />);
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

    it('renders the current session', async () => {
      fetchMock.get('/api/account/me', 200);
      fetchMock.get('/api/account/allowlisted_jwts', [
        { ...session, valid: true, current: true },
      ]);
      s4render(<SessionsSettings />);
      expect(await screen.findByText('Active')).toBeInTheDocument();
      expect(screen.queryByText(/Sign out/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Remove/i)).not.toBeInTheDocument();
      fetchMock.reset();
    });

    it('Refetch', async () => {
      fetchMock.get('/api/account/me', 200);
      fetchMock.getOnce('/api/account/allowlisted_jwts', [session]);
      s4render(<SessionsSettings />);
      expect(await screen.findAllByText('127.0.0.1')).toHaveLength(1);
      fetchMock.get(
        '/api/account/allowlisted_jwts',
        [{ ...session, valid: true, current: true }, session],
        {
          overwriteRoutes: false,
        }
      );
      act(() => {
        screen.getByText('Refresh').click();
      });
      expect(await screen.findAllByText('127.0.0.1')).toHaveLength(2);
    });

    it('Shows an error message when fails to fetch', async () => {
      fetchMock.get('/api/account/me', 200);
      fetchMock.get('/api/account/allowlisted_jwts', 500);
      s4render(<SessionsSettings />);
      expect(
        await screen.findByText('Failed to fetch sessions!')
      ).toBeInTheDocument();
      fetchMock.reset();
    });

    it('renders an expired session', () => {
      s4render(<SessionWrapper session={session} />);
      expect(
        screen.getByText('pc | Mac OSX 10.15.7 | Safari 16.4')
      ).toBeInTheDocument();
      expect(screen.getByText('Planet Earth')).toBeInTheDocument();
      expect(screen.getByText('127.0.0.1')).toBeInTheDocument();
      expect(screen.getByText('Expired')).toBeInTheDocument();
      expect(screen.getByText('Sign out')).toBeDisabled();
    });
    it('renders an active session', () => {
      s4render(<SessionWrapper session={{ ...session, valid: true }} />);
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

      s4render(<SessionWrapper session={{ ...session, valid: true }} />);
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

      s4render(<SessionWrapper session={{ ...session, valid: true }} />);
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
