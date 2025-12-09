import type { RootState } from '../../index.ts';
import { createSelector } from '@reduxjs/toolkit';

export const selectAllSkills = (state: RootState) => state.skills.skills;

export const selectSkillsById = (id: string) => {
  const memoizedSelector = createSelector(
    [selectAllSkills],
    (skills) => skills.find((skill) => skill.id === id) ?? null
  );
  return (state: RootState) => memoizedSelector(state);
};
