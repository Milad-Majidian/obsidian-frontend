import axios from "axios";
import { normalizeApiError } from "./apiError";

export const api = axios.create({ 
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  withCredentials: true,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // You can attach tokens here if needed
    return config;
  },
  (error) => {
    // Forward the error to be handled in the component or service
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Pass through successful responses
    return response;
  },
  (error) => {
    // Global errors (network issues, API 4xx/5xx, etc.)
    const status = error.response?.status;
    const message = error.response?.data?.message || "Unknown error occurred";
    // console.error(`API Error [${status}]:`, message);

    if (status === 401) {
      // Unauthorized - user is not authenticated
      // Example: clear tokens, redirect to login
      // localStorage.removeItem('token');
      // router.push('/login');
    }
    if (status === 403) {
      // Forbidden - insufficient permissions
    }
    return Promise.reject(normalizeApiError(error));
  }
);
