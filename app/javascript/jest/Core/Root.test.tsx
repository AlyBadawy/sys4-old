import React from 'react';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Root } from '../../Core/Root';

describe('Root', () => {
  it('Renders the offline page without the flipper', () => {
    render(<Root />);
    const paragraph = screen.getByText(
      /is currently offline for maintenance. Our team is working hard to bring the application back online as soon as possible, with all features fully operational/i
    );
    expect(paragraph).toBeInTheDocument();
  });

  it('Renders the home with correct paragraph', () => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    window.FLIPPERS = { app_online: true };

    render(<Root />);
    const paragraph = screen.getByText(
      /Unlock the full potential of your systems with/i
    );
    expect(paragraph).toBeInTheDocument();
  });
});
