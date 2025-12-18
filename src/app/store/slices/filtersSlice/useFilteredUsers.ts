import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectFilters } from './selectors';
import type { TUserWithDetails } from '../../../../features/users';
import type { TSkillWithoutId } from '../../../../features/users';

import { sortNewestUsers, sortPopularUsers } from '../../../../features/users';

interface UseFilteredUsersResult {
  filteredUsers: TUserWithDetails[];
  usersFound: number;
  isEmpty: boolean;
}

export const useFilteredUsers = (
  users: TUserWithDetails[]
): UseFilteredUsersResult => {
  const filters = useSelector(selectFilters);

  const filteredUsers = useMemo(() => {
    let result = [...users];

    // 1. Поиск по навыку (searchQuery) — ищем в skillsLearn
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter((user) =>
        user.skillsLearn.some((skill: TSkillWithoutId) =>
          skill.name.toLowerCase().includes(query)
        )
      );
    }

    // 2. Фильтр по полу
    if (filters.gender !== 'any') {
      result = result.filter((user) => user.gender === filters.gender);
    }

    // 3. Фильтр по городам
    if (filters.cities.length > 0) {
      result = result.filter((user) => filters.cities.includes(user.cityId));
    }

    // 4. Фильтр по навыкам с учетом mode
    if (filters.skills.length > 0) {
      result = result.filter((user) => {
        let skillsToCheck: TSkillWithoutId[] = [];

        if (filters.mode === 'teach') skillsToCheck = user.skillsTeach;
        else if (filters.mode === 'learn') skillsToCheck = user.skillsLearn;
        else skillsToCheck = [...user.skillsTeach, ...user.skillsLearn];

        return filters.skills.some((skillId) =>
          skillsToCheck.some((skill) => skill.subcategoryId === skillId)
        );
      });
    }

    // 5. Сортировка
    if (filters.sort === 'new') {
      result = sortNewestUsers(result);
    } else if (filters.sort === 'popular') {
      result = sortPopularUsers(result);
    }

    return result;
  }, [users, filters]);

  return {
    filteredUsers,
    usersFound: filteredUsers.length,
    isEmpty: filteredUsers.length === 0
  };
};
