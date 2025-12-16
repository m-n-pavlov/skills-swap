import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../index.ts';
import type { RegistrationSummary } from './registrationSlice';

export const selectRegistration = (state: RootState) => state.registration;

export const selectCanGoNext = (state: RootState): boolean => {
  const { currentStep, step1, step2 } = selectRegistration(state);

  if (currentStep === 1) return Boolean(step1.email && step1.password);
  if (currentStep === 2) return step2 !== null;
  return false;
};

export const selectRegistrationSummary = createSelector(
  [selectRegistration],
  ({ step1, step2, step3 }): RegistrationSummary => ({
    email: step1.email,
    name: step2?.name ?? null,
    date: step2?.date ?? null,
    gender: step2?.gender ?? null,
    city: step2?.city ?? null,
    categories: step2?.categories ?? null,
    subCategories: step2?.subCategories ?? null,
    avatarBase64: step2?.avatarBase64 ?? null,
    skillName: step3?.skillName ?? null,
    skillCategory: step3?.skillCategory ?? null,
    skillSubCategory: step3?.skillSubCategory ?? null,
    description: step3?.description ?? null,
    imagesBase64: step3?.imagesBase64 ?? []
  })
);
