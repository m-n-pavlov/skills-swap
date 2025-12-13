import type { TUserWithDetails } from '../type.ts';

// Сортировка по количеству лайков (от большего к меньшему)
export const sortPopularUsers = (
  users: TUserWithDetails[]
): TUserWithDetails[] => {
  // Создаём новый массив, чтобы не мутировать исходный
  return [...users].sort((a, b) => b.likes - a.likes);
};
