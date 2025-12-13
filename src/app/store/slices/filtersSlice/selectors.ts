// src/app/store/slices/filtersSlice/selectors.ts
import type { RootState } from '../../index.ts';
import type { FiltersState } from './filtersSlice';

export const selectFilters = (state: RootState): FiltersState => state.filters;

export const selectSkills = (state: RootState) => state.filters.skills;
export const selectCities = (state: RootState) => state.filters.cities;
export const selectGender = (state: RootState) => state.filters.gender;
export const selectMode = (state: RootState) => state.filters.mode;
export const selectSort = (state: RootState) => state.filters.sort;
export const selectSearchQuery = (state: RootState) =>
  state.filters.searchQuery;

export const selectHasActiveFilters = (state: RootState) => {
  const { skills, cities, gender, mode, sort, searchQuery } = state.filters;
  return (
    skills.length > 0 ||
    cities.length > 0 ||
    gender !== 'any' ||
    mode !== 'any' ||
    sort !== null ||
    searchQuery !== ''
  );
};

// Для панели активных фильтров можно возвращать массив с текстовыми лейблами
export const selectActiveFiltersForDisplay = (state: RootState) => {
  const { skills, cities, gender, mode, sort } = state.filters;
  const active: string[] = [];

  skills.forEach((id) => active.push(`Skill ID: ${id}`));
  cities.forEach((id) => active.push(`City ID: ${id}`));
  if (gender !== 'any') active.push(`Gender: ${gender}`);
  if (mode !== 'any') active.push(`Mode: ${mode}`);
  if (sort !== null) active.push(`Sort: ${sort}`);

  return active;
};
