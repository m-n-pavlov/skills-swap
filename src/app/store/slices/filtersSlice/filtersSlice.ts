import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type ModeFilter = 'any' | 'teach' | 'learn';
export type GenderFilter = 'any' | 'male' | 'female';
export type SortFilter = 'popular' | 'new' | null;

export interface FiltersState {
  skills: string[];
  cities: string[];
  gender: GenderFilter;
  mode: ModeFilter;
  sort: SortFilter;
  searchQuery: string;
}

const initialState: FiltersState = {
  skills: [],
  cities: [],
  gender: 'any',
  mode: 'any',
  sort: null,
  searchQuery: ''
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    addSkill: (state, action: PayloadAction<string>) => {
      if (!state.skills.includes(action.payload))
        state.skills.push(action.payload);
    },
    removeSkill: (state, action: PayloadAction<string>) => {
      state.skills = state.skills.filter((id) => id !== action.payload);
    },
    setSkills: (state, action: PayloadAction<string[]>) => {
      state.skills = action.payload;
    },
    addCity: (state, action: PayloadAction<string>) => {
      if (!state.cities.includes(action.payload))
        state.cities.push(action.payload);
    },
    removeCity: (state, action: PayloadAction<string>) => {
      state.cities = state.cities.filter((id) => id !== action.payload);
    },
    setCities: (state, action: PayloadAction<string[]>) => {
      state.cities = action.payload;
    },
    setGender: (state, action: PayloadAction<GenderFilter>) => {
      state.gender = action.payload;
    },
    setMode: (state, action: PayloadAction<ModeFilter>) => {
      state.mode = action.payload;
    },
    setSort: (state, action: PayloadAction<SortFilter>) => {
      state.sort = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    clearFilters: (state) => {
      state.skills = [];
      state.cities = [];
      state.gender = 'any';
      state.mode = 'any';
      state.sort = null;
      state.searchQuery = '';
    }
  }
});

export const {
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
} = filtersSlice.actions;

export default filtersSlice.reducer;
