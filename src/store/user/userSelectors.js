import { createDraftSafeSelector } from '@reduxjs/toolkit';

const userInfo = createDraftSafeSelector(
  (state) => state.USER,
  (state) => ({
    ...state
  })
);

export const userSelectors = {
  userInfo
};
