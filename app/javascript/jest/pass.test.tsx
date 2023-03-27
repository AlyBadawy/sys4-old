import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Test', () => {
  it('passes!', () => {
    render(<div>This should pass</div>);
    const paragraph = screen.getByText('This should pass');
    expect(paragraph).toBeInTheDocument();
  });
});
