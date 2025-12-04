import type { ButtonHTMLAttributes } from 'react';
import type { IconName } from '../Icon/icons';

export type MenuButtonProps = {
  label: string;
  iconName: IconName;
  iconAlt?: string;
  isActive?: boolean;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;
