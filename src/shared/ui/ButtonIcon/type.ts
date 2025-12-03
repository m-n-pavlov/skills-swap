import type { ReactNode } from 'react';

export interface ButtonIconProps {
  onClick: () => void;
  children: ReactNode;
  name: string;
  className?: string;
}
