import { ApiResponse } from '@/shared/types';

export type MainResult = ApiResponse<
  {
    id: number;
    age: number;
    name: string;
  }[]
>;
