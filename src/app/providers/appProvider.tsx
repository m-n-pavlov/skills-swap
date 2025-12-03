import * as React from 'react';
import { StoreProvider } from './storeProvider.tsx';
import { BrowserRouter } from 'react-router-dom';

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <StoreProvider>{children}</StoreProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
};
