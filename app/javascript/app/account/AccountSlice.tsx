import { createSlice, PayloadAction } from '@reduxjs/toolkit';

enum AccountLayout {
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
    setLayout: (state, action: PayloadAction<AccountState>) => {
      state.layout = action.payload.layout;
    },
  },
});

export const { setLayout } = AccountSlice.actions;
export const accountReducer = AccountSlice.reducer;
