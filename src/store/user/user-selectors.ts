import { createDraftSafeSelector } from '@reduxjs/toolkit';

const userInfo = createDraftSafeSelector(
  (state: { USER: { isAuthenticated: boolean } }) => state.USER,
  (state) => ({
    ...state
  })
);

export const userSelectors = {
  userInfo
};
