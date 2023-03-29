import '@testing-library/jest-dom/extend-expect';
import { useFlipper } from '../../hooks/useFlipper';

describe('App', () => {
  it('returns the correct value for window.FLIPPERS', () => {
    window.FLIPPERS = { feature1: true, feature2: false };

    expect(useFlipper('feature1')).toBe(true);
    expect(useFlipper('feature2')).toBe(false);
    expect(useFlipper('feature3')).toBe(false);
  });
});
