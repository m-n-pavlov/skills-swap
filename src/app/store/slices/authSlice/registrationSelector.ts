import type { RootState } from '../../index.ts';

export const selectCurrentStep = (state: RootState) =>
  state.registration.currentStep;

export const selectStep1Values = (state: RootState) => state.registration.step1;

export const selectStep2Values = (state: RootState) => state.registration.step2;

export const selectStep3Values = (state: RootState) => state.registration.step3;

export const selectIsLoading = (state: RootState) =>
  state.registration.isLoading;

export const selectError = (state: RootState) => state.registration.error;
