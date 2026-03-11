/**
 * App config & env (DESIGN_REACTNATIVE.md)
 * API_BASE_URL: trỏ đến backend api-goft-manager (mặc định localhost:3000)
 */

import Constants from 'expo-constants';

const extra = (Constants.expoConfig?.extra ?? {}) as Record<string, string>;

function getEnv(key: string): string | undefined {
  if (extra?.[key]) return extra[key];
  if (typeof process !== 'undefined' && process.env && key in process.env) {
    return (process.env as Record<string, string>)[key];
  }
  return undefined;
}

export const APP_CONFIG = {
  API_BASE_URL:
    getEnv('API_BASE_URL') ??
    getEnv('EXPO_PUBLIC_API_URL') ??
    'http://localhost:3000',
  WS_URL:
    getEnv('WS_URL') ??
    getEnv('EXPO_PUBLIC_WS_URL') ??
    'wss://ws.golfmanager.example.com',
} as const;
