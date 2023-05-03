import React from 'react';
import { act, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { s4render } from '../TestUtils';
import { NavBar } from '../../ui/navigation/NavBar';

describe('NavBar', () => {
  it('Toggles showing the menu', () => {
    s4render(<NavBar />);
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
    s4render(<NavBar />, {}, { user: { isLoggedIn: true } });

    const menuBtn = screen.getByTestId('nav-menu-btn');
    act(() => {
      menuBtn.click();
    });

    const dashboardBtn = screen.getByText('Dashboard');
    expect(dashboardBtn).toBeInTheDocument();
  });

  it('shows navigation items', () => {
    s4render(<NavBar />);

    const menuBtn = screen.getByTestId('nav-menu-btn');
    act(() => {
      menuBtn.click();
    });

    expect(screen.getByText('About')).toBeInTheDocument();
  });
});
