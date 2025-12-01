import type { ButtonHTMLAttributes } from 'react';
import type { IconName } from '../icon/icons';

export type FavoriteLinkUIProps = {
  href: string;
  iconName: IconName;
  iconAlt?: string;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;
