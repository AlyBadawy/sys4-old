import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { WithFlipper } from '../../utils/WithFlipper';

describe('WithFlipper', () => {
  beforeAll(() => {
    window.FLIPPERS = { feature1: true, feature2: false };
  });

  it('Renders the element with enabled flipper', () => {
    render(
      <WithFlipper flipper='feature1'>
        <p>Feature 1</p>
      </WithFlipper>
    );
    expect(screen.getByText('Feature 1')).toBeInTheDocument();
  });

  it('Hides the element with disabled flipper', () => {
    render(
      <WithFlipper flipper='feature2'>
        <p>Feature 2</p>
      </WithFlipper>
    );
    expect(screen.queryByText('Feature 2')).not.toBeInTheDocument();
  });
});
