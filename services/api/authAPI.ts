/**
 * Auth API (DESIGN_REACTNATIVE.md §5)
 */

import { apiClient } from './apiClient';

export type LoginPayload = { email: string; password: string };
export type RegisterPayload = {
  email: string;
  password: string;
  fullName: string;
  phone?: string;
};
export type AuthResponse = {
  user: { id: string; email: string; fullName: string; role?: 'user' | 'admin' };
  accessToken: string;
  refreshToken: string;
};

export const AuthAPI = {
  login: (data: LoginPayload) =>
    apiClient.post<AuthResponse>('/auth/login', data),

  register: (data: RegisterPayload) =>
    apiClient.post<AuthResponse>('/auth/register', data),

  forgotPassword: (email: string) =>
    apiClient.post('/auth/forgot-password', { email }),

  refresh: (refreshToken: string) =>
    apiClient.post<{ accessToken: string }>('/auth/refresh', { refreshToken }),
};
