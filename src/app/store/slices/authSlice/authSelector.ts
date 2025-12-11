import type { RootState } from '../../index.ts';

export const selectAuthUser = (state: RootState) => state.auth.user;

export const selectIsAuth = (state: RootState) => state.auth.isAuth;
