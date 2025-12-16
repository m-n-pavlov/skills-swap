import type { TUserWithDetails } from '../../features/users';
import type { IconName } from '../../shared/ui/Icon/icons.ts';

export type UserCardListProps = {
  users: TUserWithDetails[];
  onLike: (userId: string) => void;
  onMore: (userId: string) => void;
  getUserLikeData: (
    userId: string,
    userLikes: number
  ) => {
    isLiked: boolean;
    likesCount: number;
  };
  linkButtonActionType?: 'navigate' | 'tradeStatus';
  linkButtonIconName?: IconName;
};
