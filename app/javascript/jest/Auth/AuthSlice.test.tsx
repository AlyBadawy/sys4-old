import { setupStore } from '../../store/store';

describe('Auth Slice', () => {
  it('Should initially set auth to an empty object', () => {
    const store = setupStore();
    const state = store.getState();
    expect(state.user).toEqual({
      id: undefined,
      email: undefined,
      isLoggedIn: false,
      jwtToken: undefined,
    });
  });
});
