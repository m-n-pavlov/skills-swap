import type { RootState } from '../../index.ts';
import { createSelector } from '@reduxjs/toolkit';

export const selectAuthUser = (state: RootState) => state.auth.user;

export const selectIsAuth = (state: RootState) => state.auth.isAuth;

export const selectAuthError = (state: RootState) => state.auth.error;

export const selectAuthLoading = (state: RootState) => state.auth.isLoading;

// пример более "сложного" селектора
export const selectUserById = (id: string) => {
  const memoizedSelector = createSelector([selectAuthUser], (user) =>
    user?.id === id ? user : null
  );
  return (state: RootState) => memoizedSelector(state);
};
