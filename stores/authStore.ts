/**
 * Auth state – Zustand (DESIGN_REACTNATIVE.md §8)
 */

import { create } from 'zustand';

export type User = {
  id: string;
  email: string;
  fullName: string;
  role?: 'user' | 'admin';
};

type AuthState = {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string, refreshToken: string) => void;
  setToken: (token: string) => void;
  setRefreshToken: (refreshToken: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  refreshToken: null,
  isAuthenticated: false,

  setAuth: (user, token, refreshToken) =>
    set({ user, token, refreshToken, isAuthenticated: true }),

  setToken: (token) => set({ token }),

  setRefreshToken: (refreshToken) => set({ refreshToken }),

  logout: () =>
    set({ user: null, token: null, refreshToken: null, isAuthenticated: false }),
}));
