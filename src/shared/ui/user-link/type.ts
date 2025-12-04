import type { NavLinkProps } from 'react-router-dom';
import type { AvatarSize } from '../Avatar/type';

export type UserLinkUIProps = {
  href?: string;
  name?: string;
  size: AvatarSize;
  avatarUrl?: string;
  alt?: string;
  className?: string;
} & Omit<NavLinkProps, 'to' | 'className' | 'children'>;
