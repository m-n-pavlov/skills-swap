import type { TUserWithDetails } from '../useUsersWithDetails.ts';

/**
 * Сортирует пользователей по дате создания карточки (от новых к старым)
 * @param users - массив пользователей
 * @returns новый отсортированный массив пользователей
 */
export const sortNewestUsers = (
  users: TUserWithDetails[]
): TUserWithDetails[] => {
  // Создаем копию массива с помощью spread оператора
  return [...users].sort((a, b) => {
    // Преобразуем строки дат в объекты Date для сравнения
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();

    // Сортируем от новых к старым (новые имеют большее значение timestamp)
    return dateB - dateA;
  });
};
