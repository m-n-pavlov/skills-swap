import * as React from 'react';
import { StoreProvider } from './storeProvider.tsx';

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <React.StrictMode>
      <StoreProvider>{children}</StoreProvider>
    </React.StrictMode>
  );
};
