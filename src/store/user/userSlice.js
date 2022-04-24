import { createSlice } from '@reduxjs/toolkit';
import { REDUCER_NAMES } from 'constants/reducerNames';

const initialState = {
  isAuthenticated: false // for private route system
};

const userSlice = createSlice({
  name: REDUCER_NAMES.USER,
  initialState,
  reducers: {
    isUserAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    }
  }
});

export const { isUserAuthenticated } = userSlice.actions;

export default userSlice.reducer;
