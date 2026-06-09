export interface ApiSuccessResponse<T> {
  success: true;
  message: string;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: any;
}

export const ApiResponse = {
  success: <T>(message: string, data: T): ApiSuccessResponse<T> => {
    return {
      success: true,
      message,
      data,
    };
  },

  error: (
    message: string,
    errors?: any
  ): ApiErrorResponse => {
    return {
      success: false,
      message,
      errors,
    };
  },
};