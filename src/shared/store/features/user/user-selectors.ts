import { createDraftSafeSelector } from '@reduxjs/toolkit';

import { REDUCER_NAMES } from '@/shared/store/reducer-names';

import { UserInitialState } from './user-types';

const userInfo = createDraftSafeSelector(
  (state: { [REDUCER_NAMES.user]: UserInitialState }) => state[REDUCER_NAMES.user],
  (state) => ({
    ...state
  })
);

export const userSelectors = {
  userInfo
};
