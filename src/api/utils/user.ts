import type { TUser } from '../../entities/users.ts';

export const getCurrentUser = (): TUser | null => {
  try {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  } catch {
    return null;
  }
};

export const isAuthenticated = (): boolean => {
  return !!getCurrentUser();
};

export const updateUserInStorage = (userData: Partial<TUser>): void => {
  const currentUser = getCurrentUser();
  if (currentUser) {
    const updatedUser = { ...currentUser, ...userData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
  }
};

export const getCurrentUserId = (): string | null => {
  const user = getCurrentUser();
  return user?.id || null;
};
