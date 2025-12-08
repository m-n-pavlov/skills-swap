import type { TCity } from '../../../../entities/cities.ts';
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction
} from '@reduxjs/toolkit';
import { getCitiesApi } from '../../../../api';

export type CitiesSlice = {
  cities: TCity[];
  currentCity: TCity | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: CitiesSlice = {
  cities: [],
  currentCity: null,
  isLoading: false,
  error: null
};

export const fetchGetCities = createAsyncThunk(
  'categories/fetchGetCities',
  async (_, { rejectWithValue }) => {
    try {
      return await getCitiesApi();
    } catch {
      return rejectWithValue('Ошибка получения списка городов');
    }
  }
);

const citiesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    getCurrentCityById: (state, action: PayloadAction<string>) => {
      const city = state.cities.find((s) => s.id === action.payload);
      state.currentCity = city || null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetCities.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.currentCity = null;
        state.cities = [];
      })
      .addCase(fetchGetCities.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.currentCity = null;
        state.cities = action.payload;
      })
      .addCase(fetchGetCities.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.currentCity = null;
        state.cities = [];
      });
  }
});

export const { getCurrentCityById } = citiesSlice.actions;
export default citiesSlice.reducer;
