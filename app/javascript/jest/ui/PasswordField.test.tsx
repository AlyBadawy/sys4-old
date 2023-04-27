import React from 'react';
import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { PasswordField } from '../../ui/PasswordField';

describe('PasswordField', () => {
  it('renders as a password field', () => {
    render(<PasswordField id='password' />);
    expect(screen.getByTestId('password-test')).toHaveAttribute(
      'type',
      'password'
    );
  });

  it('renders with a label', () => {
    render(<PasswordField id='password' label='Password label' />);
    expect(screen.getByLabelText('Password label')).toBeInTheDocument();
  });

  it('toggles show password', () => {
    render(<PasswordField id='password' />);
    act(() => {
      screen.getByTestId('password-toggle').click();
    });
    expect(screen.getByTestId('password-test')).toHaveAttribute('type', 'text');
    act(() => {
      screen.getByTestId('password-toggle').click();
    });
    expect(screen.getByTestId('password-test')).toHaveAttribute(
      'type',
      'password'
    );
  });
});
