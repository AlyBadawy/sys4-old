import React from 'react';
import { SessionsSettings } from '../../app/account/SessionsSettings';
import { renderWithRedux } from '../TestUtils';
import { screen } from '@testing-library/react';
import { SessionWrapper } from '../../app/account/SessionWrapper';
import { Session } from '../../types/Session';

describe('Sessions', () => {
  describe('SessionsSettings', () => {
    it('renders correctly', () => {
      renderWithRedux(<SessionsSettings />);
      expect(screen.getByText('Your sessions:')).toBeInTheDocument();
      // TODO: Add tests for mocking sessions API and testing the sessions and finding 'Sessions that are older than a month will be automatically deleted.'
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
  });
});
