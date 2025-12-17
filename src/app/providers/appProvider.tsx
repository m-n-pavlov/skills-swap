import * as React from 'react';
import { StoreProvider } from './storeProvider.tsx';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './ThemeProvider.tsx';

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <StoreProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </StoreProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
};
