import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

const initialState: User = {
  id: undefined,
  email: undefined,
  jwtToken: localStorage.getItem('jwtToken') || undefined,
  isLoggedIn: !!localStorage.getItem('jwtToken'),
};

export const UserSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state = { ...state, ...action.payload, isLoggedIn: true };
      localStorage.setItem('jwtToken', action.payload.jwtToken || '');
    },

    logOut: (state, _action: PayloadAction<void>) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      state = {...initialState, isLoggedIn: false, jwtToken: undefined};
      localStorage.removeItem('jwtToken');
    },
  },
});

export const { setUser, logOut } = UserSlice.actions;
export const userReducer = UserSlice.reducer;
