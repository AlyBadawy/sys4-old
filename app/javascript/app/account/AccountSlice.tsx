import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum AccountLayout {
  Personal,
  Sessions,
}

interface AccountState {
  layout: AccountLayout;
}

const initialState: AccountState = {
  layout: AccountLayout.Personal,
};

export const AccountSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLayout: (state, action: PayloadAction<AccountLayout>) => {
      state.layout = action.payload;
    },
  },
});

export const { setLayout } = AccountSlice.actions;
export const accountReducer = AccountSlice.reducer;
