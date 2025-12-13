// src/app/store/slices/filtersSlice/useFilterActions.ts
import { useDispatch } from 'react-redux';
import {
  addSkill,
  removeSkill,
  setSkills,
  addCity,
  removeCity,
  setCities,
  setGender,
  setMode,
  setSort,
  setSearchQuery,
  clearFilters
} from './filtersSlice';

export const useFilterActions = () => {
  const dispatch = useDispatch();

  return {
    addSkill: (skillId: string) => dispatch(addSkill(skillId)),
    removeSkill: (skillId: string) => dispatch(removeSkill(skillId)),
    setSkills: (skillsIds: string[]) => dispatch(setSkills(skillsIds)),

    addCity: (cityId: string) => dispatch(addCity(cityId)),
    removeCity: (cityId: string) => dispatch(removeCity(cityId)),
    setCities: (citiesIds: string[]) => dispatch(setCities(citiesIds)),

    setGender: (gender: 'any' | 'male' | 'female') =>
      dispatch(setGender(gender)),
    setMode: (mode: 'any' | 'teach' | 'learn') => dispatch(setMode(mode)),
    setSort: (sort: 'popular' | 'new' | null) => dispatch(setSort(sort)),
    setSearchQuery: (query: string) => dispatch(setSearchQuery(query)),
    clearFilters: () => dispatch(clearFilters())
  };
};
