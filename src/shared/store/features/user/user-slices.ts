import { createSlice } from '@reduxjs/toolkit';

import type { UserInitialState } from './user-types';

const initialState: UserInitialState = {
  isAuthenticated: false
};

const userSlices = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginAction: (state) => ({
      ...state,
      isAuthenticated: true
    }),
    logoutAction: () => initialState
  }
});

export const { loginAction, logoutAction } = userSlices.actions;

export default userSlices.reducer;
