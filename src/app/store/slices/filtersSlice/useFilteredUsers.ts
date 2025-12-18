import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectFilters } from './selectors';
import type { TUserWithDetails } from '../../../../features/users';
import type { TSkill } from '../../../../entities/skills.ts';
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

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter((user) =>
        user.skillsLearn.some((skill) =>
          skill.name.toLowerCase().includes(query)
        )
      );
    }

    if (filters.gender !== 'any') {
      result = result.filter((user) => user.gender === filters.gender);
    }

    if (filters.cities.length > 0) {
      result = result.filter((user) => filters.cities.includes(user.city.id));
    }

    if (filters.skills.length > 0) {
      result = result.filter((user) => {
        let skillsToCheck: (TSkill & {
          categoryName: string;
          subcategoryName: string;
        })[] = [];

        if (filters.mode === 'teach') skillsToCheck = user.skillsTeach;
        else if (filters.mode === 'learn') skillsToCheck = user.skillsLearn;
        else skillsToCheck = [...user.skillsTeach, ...user.skillsLearn];

        return filters.skills.some((skillId) =>
          skillsToCheck.some((skill) => skill.id === skillId)
        );
      });
    }

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
