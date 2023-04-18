import React from 'react';
import { act, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithRedux } from '../TestUtils';
import { NavBar } from '../../components/ui/NavBar';

describe('NavBar', () => {
  it('Toggles showing the menu', () => {
    renderWithRedux(<NavBar />);
    let signInBtn = screen.queryByText('Sign in');
    expect(signInBtn).not.toBeInTheDocument();

    const menuBtn = screen.getByTestId('nav-menu-btn');
    act(() => {
      menuBtn.click();
    });

    signInBtn = screen.getByText('Sign in');
    expect(signInBtn).toBeInTheDocument();
  });

  it('shows Dashboard when user logged in', () => {
    renderWithRedux(<NavBar />, {}, { auth: { isLoggedIn: true } });

    const menuBtn = screen.getByTestId('nav-menu-btn');
    act(() => {
      menuBtn.click();
    });

    const dashboardBtn = screen.getByText('Dashboard');
    expect(dashboardBtn).toBeInTheDocument();
  });

  it('shows navigation items', () => {
    renderWithRedux(<NavBar />);

    const menuBtn = screen.getByTestId('nav-menu-btn');
    act(() => {
      menuBtn.click();
    });

    expect(screen.getByText('Development')).toBeInTheDocument();
    expect(screen.getByText('Productivity')).toBeInTheDocument();
    expect(screen.getByText('News')).toBeInTheDocument();
    expect(screen.getByText('Health')).toBeInTheDocument();
    expect(screen.getByText('Education')).toBeInTheDocument();
  });
});
