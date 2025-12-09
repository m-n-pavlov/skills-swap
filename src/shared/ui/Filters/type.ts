import type { TCategory } from '../../../entities/categories.ts';
import type { TCity } from '../../../entities/cities.ts';

export type TFilters = {
  categories: TCategory[];
  cities: TCity[];
  onFiltersChange?: (filters: {
    type: string;
    skills: string[];
    gender: string;
    cities: string[];
  }) => void;
};

export type FiltersState = {
  type: string;
  skills: string[];
  gender: string;
  cities: string[];
};
