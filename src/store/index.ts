import { configureStore } from '@reduxjs/toolkit';
import { REDUCER_NAMES } from 'constants/reducer-names';

import useReducer from 'store/user/user-slice';

export const store = configureStore({
  reducer: {
    [REDUCER_NAMES.USER]: useReducer
  }
});
