import type { ReactNode } from 'react';
import type { IconName } from '../Icon/icons';

export type ButtonProps = {
  children: ReactNode;
  onClick: () => void;
  style: 'primary' | 'secondary' | 'tertiary' | 'text' | 'icon';
  type: 'submit' | 'button';
  className?: string;
  disabled?: boolean;
  iconName?: IconName;
  iconPosition?: 'left' | 'right';
  iconAlt?: string;
};
