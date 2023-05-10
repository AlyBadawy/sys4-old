import '@testing-library/jest-dom/extend-expect';
import { screen } from '@testing-library/react';
import React from 'react';
import NotFound from '../../Core/NotFound';
import { s4render } from '../TestUtils';

describe('NotFound', () => {
  it('Renders the Not Found Page page', () => {
    s4render(<NotFound />);
    const paragraph = screen.getByText(
      /We are sorry, but the page you are looking for does not exist or has been moved/
    );
    expect(paragraph).toBeInTheDocument();
  });
});
