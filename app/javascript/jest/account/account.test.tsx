import React from 'react';
import { s4render } from '../TestUtils';
import { screen } from '@testing-library/react';
import { Account } from '../../app/account/Account';

describe('Account', () => {
  it('renders correctly', () => {
    s4render(<Account />);
    expect(screen.getByText('Personal')).toBeInTheDocument();
    expect(screen.getByText('Sessions')).toBeInTheDocument();
  });

  it('renders PersonalSettings by default', () => {
    s4render(<Account />);
    expect(screen.getByTestId('personal-settings-page')).toBeInTheDocument();
  });
  it('renders PasswordSettings when Sessions is clicked', async () => {
    s4render(<Account />);
    screen.getByText('Password').click();
    expect(
      await screen.findByTestId('password-settings-page')
    ).toBeInTheDocument();
  });
  it('renders SessionsSettings when Sessions is clicked', async () => {
    s4render(<Account />);
    screen.getByText('Sessions').click();
    expect(
      await screen.findByTestId('sessions-settings-page')
    ).toBeInTheDocument();
  });
  it('renders PersonalSettings when Personal is clicked', async () => {
    s4render(<Account />);
    screen.getByText('Sessions').click();
    screen.getByText('Personal').click();
    expect(
      await screen.findByTestId('personal-settings-page')
    ).toBeInTheDocument();
  });
});
