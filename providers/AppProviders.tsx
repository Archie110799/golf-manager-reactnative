/**
 * Global providers (DESIGN_REACTNATIVE.md)
 */

import React from 'react';
import Toast from 'react-native-toast-message';
import { QueryProvider } from './QueryProvider';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      {children}
      <Toast />
    </QueryProvider>
  );
}
