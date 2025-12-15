import type { TUserWithDetails } from '../../../features/users';

export interface UserCardProps {
  user: TUserWithDetails;
  avatar?: {
    size?: 'small' | 'medium' | 'large';
    className?: string;
  };
  className?: string;
  showLinkButton?: boolean;
  onLike?: (id: string) => void;
  onMore?: (id: string) => void;
  isLiked?: boolean; // ← добавить
  likesCount?: number; // ← добавить
}
