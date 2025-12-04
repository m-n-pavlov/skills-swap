import type { IconName } from './icons';
import type { CSSProperties } from 'react';

export type IconProps = {
  name: IconName;
  alt: string;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
};
