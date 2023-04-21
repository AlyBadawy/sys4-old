import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { NotFound } from '../../Core/NotFound';
import { renderWithRedux } from '../TestUtils';

describe('NotFound', () => {
  it('Renders the Not Found Page page', () => {
    renderWithRedux(<NotFound />);
    const paragraph = screen.getByText(
      /We are sorry, but the page you are looking for does not exist or has been moved/
    );
    expect(paragraph).toBeInTheDocument();
  });
});
