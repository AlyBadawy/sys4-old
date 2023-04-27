import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { s4render } from '../TestUtils';
import { Footer } from '../../ui/footer/Footer';

describe('Footer', () => {
  it('shows the GIT information', () => {
    window.GIT_REVISION = {
      revision: '1234',
      tag: 'v1.0.0',
      message: 'Version: 1.0.0 - Revision: test',
    };
    s4render(<Footer />);
    expect(screen.getAllByText(/Version: 1.0.0 - Revision: test/)).toHaveLength(
      2
    );
  });

  it('shows the copyright correctly', () => {
    s4render(<Footer />);
    const re = RegExp(`Copyright © ${new Date().getFullYear()}`, 'i');
    expect(screen.getAllByText(re)).toHaveLength(2);
  });
});
