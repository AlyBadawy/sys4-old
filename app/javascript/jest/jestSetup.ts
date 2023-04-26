/* eslint-disable @typescript-eslint/naming-convention */
import '@testing-library/jest-dom';
import { fetch, Headers, Request, Response } from 'cross-fetch';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const mockedUsedNavigate = jest.fn();
// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

global.fetch = fetch;
global.Headers = Headers;
global.Request = Request;
global.Response = Response;

export const handlers = [
  rest.get('http://localhost/api/status/user', (_req, res, ctx) => {
    return res(ctx.json({ status: 'user ok' }));
  }),
];

export const server = setupServer(...handlers);

// Enable the API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable the API mocking after the tests finished.
afterAll(() => server.close());
