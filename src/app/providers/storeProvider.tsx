import { Provider } from 'react-redux';
import { store } from '../store';
import * as React from 'react';

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};
