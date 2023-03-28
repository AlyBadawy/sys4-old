import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  userId?: string;
  email?: string;
  jwtToken?: string;
  isLoggedIn?: boolean;
}

const initialState: AuthState = {
  userId: undefined,
  email: undefined,
  jwtToken: localStorage.getItem('jwtToken') || undefined,
  isLoggedIn: !!localStorage.getItem('jwtToken'),
};

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthState>) => {
      state.userId = action.payload.userId;
      state.email = action.payload.email;
      state.jwtToken = action.payload.jwtToken;
      state.isLoggedIn = true;
      localStorage.setItem('jwtToken', action.payload.jwtToken || '');
    },

    logOut: (state, _action: PayloadAction<void>) => {
      state.isLoggedIn = false;
      state.jwtToken = undefined;
      state.userId = undefined;
      state.email = undefined;
      localStorage.removeItem('jwtToken');
    },
  },
});

export const { setCredentials, logOut } = AuthSlice.actions;
export const authReducer = AuthSlice.reducer;
