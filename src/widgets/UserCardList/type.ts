import type { TUserWithDetails } from '../../features/users';

export type UserCardListProps = {
  users: TUserWithDetails[];
  onLike: (userId: string) => void;
  onMore: (userId: string) => void;
};
