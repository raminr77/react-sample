import { apiService } from '@/shared/services/api-service';
import { REQUEST_METHODS } from '@/shared/constants';

import type { LoginQuery, LoginResult } from './types';
import { ENDPOINT } from './endpoints';

export const userApi = apiService.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResult, LoginQuery>({
      query: () => ({
        url: ENDPOINT.login,
        method: REQUEST_METHODS.POST
      })
    })
  })
});

export const { useLoginMutation } = userApi;
