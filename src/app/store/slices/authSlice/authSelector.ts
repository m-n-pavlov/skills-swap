import type { RootState } from '../../index.ts';
import type { TAuthUser } from '../../../../entities/authUser.ts';

export const selectCurrentUser = (state: RootState): TAuthUser | null =>
  state.auth.currentUser;

export const selectIsAuth = (state: RootState): boolean =>
  Boolean(state.auth.currentUser);

export const selectIsAuthenticated = (state: RootState): boolean =>
  Boolean(state.auth.currentUser);

export const selectAuthLoading = (state: RootState): boolean =>
  state.auth.isLoading;

export const selectAuthError = (state: RootState): string | null =>
  state.auth.error;
