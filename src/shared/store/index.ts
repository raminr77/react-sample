import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import { setupListeners } from '@reduxjs/toolkit/query';
import storage from 'redux-persist/lib/storage';

import { apiService } from '@/shared/services/api-service';
import { APP_DATA } from '@/shared/constants';

import userSlice from './features/user/user-slices';
import { REDUCER_NAMES } from './reducer-names';

const persistConfig = {
  key: `${APP_DATA.name.toUpperCase()}_PERSISTED_DATA`,
  whitelist: [REDUCER_NAMES.user],
  version: 1,
  storage
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    [apiService.reducerPath]: apiService.reducer,
    [REDUCER_NAMES.user]: userSlice
  })
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat([apiService.middleware])
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);
