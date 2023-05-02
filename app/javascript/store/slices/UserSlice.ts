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
      state.id = action.payload.id || state.id;
      state.email = action.payload.email || state.email;
      state.unconfirmedEmail = action.payload.unconfirmedEmail || state.unconfirmedEmail;
      state.firstName = action.payload.firstName || state.firstName;
      state.lastName = action.payload.lastName || state.lastName;
      state.maxRequests = action.payload.maxRequests || state.maxRequests;
      state.usedRequests = action.payload.usedRequests || state.usedRequests;
      state.canMakeRequests = action.payload.canMakeRequests || state.canMakeRequests;
      state.createdAt = action.payload.createdAt || state.createdAt;
      state.updatedAt = action.payload.updatedAt || state.updatedAt;
      state.jwtToken = action.payload.jwtToken || state.jwtToken;
      state.isLoggedIn = true || state.isLoggedIn;
      if (action.payload.jwtToken) {
        localStorage.setItem('jwtToken', action.payload.jwtToken);
      } else {
        localStorage.removeItem('jwtToken');
      }
    },

    logOut: (state, _action: PayloadAction<void>) => {
      state.id = undefined;
      state.email = undefined;
      state.unconfirmedEmail = undefined;
      state.firstName = undefined;
      state.lastName = undefined;
      state.maxRequests = undefined;
      state.usedRequests = undefined;
      state.canMakeRequests = undefined;
      state.createdAt = undefined;
      state.updatedAt = undefined;
      state.jwtToken = undefined;
      state.isLoggedIn = false;
      localStorage.removeItem('jwtToken');
    },
  },
});

export const { setUser, logOut } = UserSlice.actions;
export const userReducer = UserSlice.reducer;
