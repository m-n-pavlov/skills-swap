import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { IconName } from '../Icon/icons';

export type MenuButtonSize = 'small' | 'medium' | 'large';
export type MenuButtonTheme = 'primary' | 'secondary';

export type MenuButtonProps = {
  label: string;
  iconName: IconName;
  iconAlt?: string;
  isActive?: boolean;

  hideLabel?: boolean;
  iconPosition?: 'left' | 'right';
  size?: MenuButtonSize;
  theme?: MenuButtonTheme;

  className?: string;
  children?: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'>;
