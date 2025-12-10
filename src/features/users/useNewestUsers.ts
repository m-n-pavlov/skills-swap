import { useMemo } from 'react';
import type { TUserWithDetails } from './type';

// Сортировка по дате создания карточки (от новых к старым)
export const useNewestUsers = (
  users: TUserWithDetails[]
): TUserWithDetails[] => {
  return useMemo(() => {
    return [...users].sort((a, b) => {
      // Преобразуем строки даты в миллисекунды для сравнения
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateB - dateA; // новые в начале
    });
  }, [users]);
};
