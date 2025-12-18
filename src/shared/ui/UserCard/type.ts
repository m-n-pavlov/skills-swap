import type { TUserWithDetails } from '../../../features/users';
import type { IconName } from '../Icon/icons.ts';

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
  isLiked?: boolean;
  likesCount?: number;
  linkButtonActionType?: 'navigate' | 'tradeStatus';
  linkButtonIconName?: IconName;
}
