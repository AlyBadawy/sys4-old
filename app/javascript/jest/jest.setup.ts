import '@testing-library/jest-dom';

const mockedUsedNavigate = jest.fn();
// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));
