export type AvatarSize = 'small' | 'medium' | 'large';

export type AvatarProps = {
  size: AvatarSize;
  avatarUrl?: string;
  alt?: string;
  className?: string;
};
