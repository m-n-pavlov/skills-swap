export type AvatarSize = 'small' | 'medium' | 'large';

export interface AvatarProps {
  size: AvatarSize;
  avatarUrl?: string;
  alt?: string;
  className?: string;
}
