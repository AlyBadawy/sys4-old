// PACKAGES
import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

// CORE
import NotFound from '../../Core/NotFound';

// TESTUTILS';
import { s4render } from '../TestUtils';

// TESTS
describe('NotFound', () => {
  it('Renders the Not Found Page page', () => {
    s4render(<NotFound />);
    const paragraph = screen.getByText(
      /We are sorry, but the page you are looking for does not exist or has been moved/
    );
    expect(paragraph).toBeInTheDocument();
  });
});
