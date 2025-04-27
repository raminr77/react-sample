import { ApiResponse } from '@/shared/types';

export type LoginResult = ApiResponse<{
  token: string;
}>;
