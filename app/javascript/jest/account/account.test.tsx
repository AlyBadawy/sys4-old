import React from 'react';
import { renderWithRedux } from '../TestUtils';
import { screen } from '@testing-library/react';
import { Account } from '../../app/account/Account';

describe('Account', () => {
  it('renders correctly', () => {
    renderWithRedux(<Account />);
    expect(screen.getByText('Personal')).toBeInTheDocument();
    expect(screen.getByText('Sessions')).toBeInTheDocument();
  });

  it('renders PersonalSettings by default', () => {
    renderWithRedux(<Account />);
    expect(screen.getByText('PersonalSettings')).toBeInTheDocument();
  });
  it('renders SessionsSettings when Sessions is clicked', async () => {
    renderWithRedux(<Account />);
    screen.getByText('Sessions').click();
    expect(await screen.findByText('Your sessions:')).toBeInTheDocument();
  });
  it('renders PersonalSettings when Personal is clicked', async () => {
    renderWithRedux(<Account />);
    screen.getByText('Sessions').click();
    screen.getByText('Personal').click();
    expect(await screen.findByText('PersonalSettings')).toBeInTheDocument();
  });
});
