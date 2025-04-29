import { apiService } from '@/shared/services/api-service';
import { REQUEST_METHODS } from '@/shared/constants';

import type { MainQuery, MainResult } from './types';
import { ENDPOINT } from './endpoints';
import { MAIN_TAGS } from './tags';

export const userApi = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getMain: builder.query<MainResult, MainQuery>({
      query: () => ({
        url: ENDPOINT.main,
        method: REQUEST_METHODS.GET
      }),
      providesTags: [MAIN_TAGS.MAIN]
    })
  })
});

export const { useGetMainQuery } = userApi;
