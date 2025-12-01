import type { ButtonHTMLAttributes } from 'react';
import type { IconName } from '../icon/icons';

export type MenuButtonUIProps = {
  label: string;
  iconName: IconName;
  iconAlt?: string;
  isActive?: boolean;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;
