import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_BASE_URL } from '@/shared/constants';

import { API_TAGS } from './api-tags';

export const apiService = createApi({
  reducerPath: 'apiService',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL
  }),
  tagTypes: API_TAGS,
  endpoints: () => ({})
});
