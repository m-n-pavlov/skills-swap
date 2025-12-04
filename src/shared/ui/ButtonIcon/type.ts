import type { ReactNode } from 'react';

export type ButtonIconProps = {
  onClick: () => void;
  children: ReactNode;
  name: string;
  className?: string;
};
