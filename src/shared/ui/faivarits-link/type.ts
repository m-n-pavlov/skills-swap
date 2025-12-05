import type { NavLinkProps } from 'react-router-dom';
import type { IconName } from '../Icon/icons';

export type FaivaritsLinkUIProps = {
  href: string;
  iconName: IconName;
  iconAlt?: string;
  className?: string;
} & Omit<NavLinkProps, 'to' | 'className'>;
