import type { TUser } from '../../entities/users.ts';

export type UserCardListProps = {
  users: TUser[];
  onLike: (userId: string) => void;
  onMore: (userId: string) => void;
};
