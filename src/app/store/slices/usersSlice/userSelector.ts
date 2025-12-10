import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../index.ts';

export const selectAllUsers = (state: RootState) => state.users.users;

export const selectUserById = (id: string) => {
  const memoizedSelector = createSelector(
    [selectAllUsers],
    (users) => users.find((user) => user.id === id) ?? null
  );
  return (state: RootState) => memoizedSelector(state);
};
