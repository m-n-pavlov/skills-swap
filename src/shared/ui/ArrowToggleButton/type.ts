import type { CSSProperties } from 'react';

export type ArrowToggleButtonProps = {
  label: string;
  onClick: () => void;
  isOpen: boolean;
  className?: string;
  labelStyle?: CSSProperties;
  iconGap?: number | string;
};
