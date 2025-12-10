import { useMemo } from 'react';
import type { TUserWithDetails } from './type';

// Сортировка по количеству лайков (от большего к меньшему)
export const usePopularUsers = (
  users: TUserWithDetails[]
): TUserWithDetails[] => {
  return useMemo(() => {
    // Создаём новый массив, чтобы не мутировать исходный
    return [...users].sort((a, b) => b.likes - a.likes);
  }, [users]);
};
