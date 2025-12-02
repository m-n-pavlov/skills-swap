import type { NavLinkProps } from 'react-router-dom';
import type { IconName } from '../icon/icons';

export type FavoriteLinkUIProps = {
  href: string;
  iconName: IconName;
  iconAlt?: string;
  className?: string;
} & Omit<NavLinkProps, 'to' | 'className'>;
