import type { TUserWithDetails } from '../useUsersWithDetails.ts';

export const sortPopularUsers = (
  users: TUserWithDetails[]
): TUserWithDetails[] => {
  return [...users].sort((a, b) => {
    return b.likes - a.likes;
  });
};
