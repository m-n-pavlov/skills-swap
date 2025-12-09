import type { RootState } from '../../index.ts';
import { createSelector } from '@reduxjs/toolkit';

export const selectAllCities = (state: RootState) => state.cities.cities;

export const selectCityById = (id: string) => {
  const memoizedSelector = createSelector(
    [selectAllCities],
    (cities) => cities.find((city) => city.id === id) ?? null
  );
  return (state: RootState) => memoizedSelector(state);
};
