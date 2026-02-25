/**
 * HTTP Client - Centralized API communication
 * Single Responsibility: Handle all HTTP requests with interceptors
 */
import axios from "axios";
import { tokenStorage } from "../utils/storage";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";
const API_TIMEOUT = import.meta.env.VITE_API_TIMEOUT || 30000;

const httpClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - Add auth token
httpClient.interceptors.request.use(
  (config) => {
    const token = tokenStorage.get();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
httpClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      // Handle 401 Unauthorized
      if (status === 401) {
        tokenStorage.remove();
        window.location.href = "/login";
      }

      // Return formatted error
      return Promise.reject({
        status,
        message: data?.message || "An error occurred",
        errors: data?.errors || [],
      });
    }

    // Network error
    return Promise.reject({
      status: 0,
      message: "Network error. Please check your connection.",
      errors: [],
    });
  }
);

export { httpClient };
