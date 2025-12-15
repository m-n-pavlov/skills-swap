import type { AvatarSize } from '../Avatar/type';
import type { ReactNode } from 'react';

export type UserButtonUIProps = {
  size: AvatarSize;
  hrefProfile: string;
  avatarUrl?: string;
  alt?: string;
  className?: string;
  name?: string;
  type?: 'button';
  children?: ReactNode;
  handleLogOut: () => void;
};
