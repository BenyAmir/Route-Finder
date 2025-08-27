export interface SuccessResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

interface ValidationError {
  field: string;
  message: string;
}
export interface ErrorResponse {
  error?: string;
  errors?: ValidationError[];
  success: boolean;
  message?: string;
}

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

export type PaginationParams = {
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
};
