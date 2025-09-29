// utils/apiError.ts
export interface ApiError {
  status?: number;
  message: string;
}

export const normalizeApiError = (error: any): ApiError => {
  const status = error.response?.status;
  const message =
    error.response?.data?.message ||
    (status === 404
      ? "The requested resource was not found."
      : status === 500
      ? "Something went wrong on our end. Please try again later."
      : "An unexpected error occurred.");

  return { status, message };
};
