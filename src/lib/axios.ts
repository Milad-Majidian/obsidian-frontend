import axios from "axios";
import { normalizeApiError } from "./apiError";

// Ensure API URL is set correctly
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Debug log in development to catch configuration issues
// if (process.env.NODE_ENV === 'development') {
//   console.log('[Axios Config] API Base URL:', API_BASE_URL);
// }

export const api = axios.create({ 
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: 30000, // 30 second timeout
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Debug: Log all API requests in development
    if (process.env.NODE_ENV === 'development') {
      // const fullUrl = `${config.baseURL || ''}${config.url || ''}`;
      // console.log('[API Request]', config.method?.toUpperCase(), fullUrl);
    }
    
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
