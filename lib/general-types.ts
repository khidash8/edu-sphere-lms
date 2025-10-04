/* eslint-disable @typescript-eslint/no-explicit-any */
export type ApiResponse = {
  status: 'success' | 'error';
  message: string;
  data?: any;
};
