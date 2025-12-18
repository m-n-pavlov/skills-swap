import React from 'react';
import type { IconName } from '../Icon/icons.ts';

export type LinkButtonProps = {
  children?: React.ReactNode;
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
  style: 'primary' | 'secondary' | 'tertiary';
  to: string;
  actionType?: 'navigate' | 'tradeStatus';
  iconName?: IconName;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
};
