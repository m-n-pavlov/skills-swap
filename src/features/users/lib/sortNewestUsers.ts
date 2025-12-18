import type { TUserWithDetails } from '../useUsersWithDetails.ts';

export const sortNewestUsers = (
  users: TUserWithDetails[]
): TUserWithDetails[] => {
  return [...users].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();

    return dateB - dateA;
  });
};
