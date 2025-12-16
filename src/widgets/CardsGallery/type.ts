import type { TUserWithDetails } from '../../features/users';

export type CardsGalleryProps = {
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
};
