/**
 * Axios client – Bearer JWT, 401 → refresh (DESIGN_REACTNATIVE.md §5)
 */

import { APP_CONFIG } from '@/config/env';
import { useAuthStore } from '@/stores/authStore';
import axios, { type AxiosError } from 'axios';

export const apiClient = axios.create({
  baseURL: APP_CONFIG.API_BASE_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as typeof error.config & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = useAuthStore.getState().refreshToken;
      if (refreshToken) {
        try {
          const { data } = await axios.post<{
            accessToken: string;
            refreshToken: string;
          }>(
            `${APP_CONFIG.API_BASE_URL}/auth/refresh`,
            { refreshToken }
          );
          useAuthStore.getState().setToken(data.accessToken);
          useAuthStore.getState().setRefreshToken(data.refreshToken);
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
          }
          return apiClient(originalRequest);
        } catch {
          useAuthStore.getState().logout();
        }
      }
    }

    return Promise.reject(error);
  }
);
