// Получить текущего пользователя из localStorage
import type { TUser } from '../../entities/users.ts';

export const getCurrentUser = (): TUser | null => {
  try {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  } catch {
    return null;
  }
};

// Проверить, авторизован ли пользователь
export const isAuthenticated = (): boolean => {
  return !!getCurrentUser();
};

// Обновить пользователя в localStorage
export const updateUserInStorage = (userData: Partial<TUser>): void => {
  const currentUser = getCurrentUser();
  if (currentUser) {
    const updatedUser = { ...currentUser, ...userData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
  }
};

// Получить ID текущего пользователя
export const getCurrentUserId = (): string | null => {
  const user = getCurrentUser();
  return user?.id || null;
};
