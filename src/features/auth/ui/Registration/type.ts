import type { ReactNode } from 'react';
import type { StepIllustrationCode } from '../../../../shared/ui/StepIllustration/type';

export type RegistrationLayoutProps = {
  currentStep: StepIllustrationCode;
  children: ReactNode;
};
