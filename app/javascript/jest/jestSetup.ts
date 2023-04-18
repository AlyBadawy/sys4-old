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
  rest.get('https://pokeapi.co/api/v2/pokemon/*', (_req, res, ctx) => {
    return res(ctx.json({}));
  }),
];

// This configures a request mocking server with the given request handlers.
// import dummyPokemon from 'src/tests/dummyPokemon';
// export const handlers = [
//   rest.get('https://pokeapi.co/api/v2/pokemon/*', (_req, res, ctx) => {
//     return res(ctx.json(dummyPokemon));
//   }),
// ];

export const server = setupServer(...handlers);

// Enable the API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable the API mocking after the tests finished.
afterAll(() => server.close());
