import type { ReactNode } from 'react';

export type StepIllustrationCode = 1 | 2 | 3;

export type StepIllustrationConfig = {
  title: string;
  subtitle: string;
};

export type StepIllustrationProps = {
  code: StepIllustrationCode;
  className?: string;
  children?: ReactNode;
};
