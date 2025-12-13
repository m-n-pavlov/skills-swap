import type { TUserWithDetails } from '../type.ts';

// Сортировка по дате создания карточки (от новых к старым)
export const sortNewestUsers = (
  users: TUserWithDetails[]
): TUserWithDetails[] => {
  return [...users].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return dateB - dateA; // новые в начале
  });
};
