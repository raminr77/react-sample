import { createSlice } from '@reduxjs/toolkit';
import { REDUCER_NAMES } from 'constants/ReducerNames';

const initialState = {
  isAuthenticated: false // for private route system
};

const userSlice = createSlice({
  name: REDUCER_NAMES.USER,
  initialState,
  reducers: {
    userLogoutAction: (state) => {
      state.isAuthenticated = false;
    }
  }
});

export const { userLogoutAction } = userSlice.actions;

export default userSlice.reducer;
