import { ApiResponse } from '@/shared/types';

export type LoginResult = ApiResponse<{
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}>;
