import type { ReactNode } from 'react';
import type { TCategory } from '../../entities/categories.ts';

export type TSkillsPopoverProps = {
  categories: TCategory[];
  children?: ReactNode;
  className?: string;
  onClick?: (skill: string, id: string) => void;
};
