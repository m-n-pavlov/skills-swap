import type { TCity } from '../../../../entities/cities.ts';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCitiesApi } from '../../../../api';

type CitiesSlice = {
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

export const fetchCityById = createAsyncThunk<
  TCity | null,
  string,
  { rejectValue: string }
>('categories/fetchCategoryById', async (id, { rejectWithValue }) => {
  try {
    const categories = await getCitiesApi();
    return categories.find((cat) => cat.id === id) || null;
  } catch {
    return rejectWithValue('Ошибка получения города по ID');
  }
});

const citiesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
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

    builder
      .addCase(fetchCityById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.currentCity = null;
        state.cities = [];
      })
      .addCase(fetchCityById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.currentCity = action.payload;
        state.cities = [];
      })
      .addCase(fetchCityById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.currentCity = null;
        state.cities = [];
      });
  }
});

export default citiesSlice.reducer;
