import type { ReactNode } from 'react';

export type ButtonProps = {
  children: ReactNode;
  onClick: () => void;
  style: 'primary' | 'secondary' | 'tertiary';
  type: 'submit' | 'button';
  className?: string;
  disabled?: boolean;
};
