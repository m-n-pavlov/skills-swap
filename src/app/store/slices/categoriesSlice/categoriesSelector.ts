import type { RootState } from '../../index.ts';
import { createSelector } from '@reduxjs/toolkit';

export const selectAllCategories = (state: RootState) =>
  state.categories.categories;

export const selectCategoryById = createSelector(
  [selectAllCategories, (_state: RootState, id: string) => id],
  (categories, id) => categories.find((cat) => cat.id === id) ?? null
);

export const selectSubCategoryById = () =>
  createSelector(
    [selectAllCategories, (_state: RootState, id: string) => id],
    (categories, id) => {
      for (const category of categories) {
        const sub = category.subCategories.find((sub) => sub.id === id);
        if (sub) return sub;
      }
      return null;
    }
  );
