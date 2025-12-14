import type { TUserWithDetails } from '../useUsersWithDetails.ts';

/**
 * Сортирует пользователей по количеству лайков (от большего к меньшему)
 * @param users - массив пользователей
 * @returns новый отсортированный массив пользователей
 */
export const sortPopularUsers = (
  users: TUserWithDetails[]
): TUserWithDetails[] => {
  // Создаем копию массива с помощью spread оператора
  return [...users].sort((a, b) => {
    // Сортируем по убыванию лайков (большее значение идет первым)
    return b.likes - a.likes;
  });
};
