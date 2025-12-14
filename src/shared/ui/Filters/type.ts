export type ModeFilter = 'any' | 'learn' | 'teach';
export type GenderFilter = 'any' | 'male' | 'female';

export interface FiltersState {
  type: ModeFilter;
  skillIds: string[];
  gender: GenderFilter;
  cityIds: string[];
}

export interface TFilters {
  categories: Array<{
    id: string;
    name: string;
    subCategories: Array<{
      id: string;
      name: string;
    }>;
  }>;
  cities: Array<{ location: string; id: string }>;
  onFiltersChange?: (filters: FiltersState) => void;
}
