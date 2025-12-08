import type {
  TCategory,
  TSubCategories
} from '../../../../entities/categories.ts';
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction
} from '@reduxjs/toolkit';
import { getCategoriesApi } from '../../../../api';

export type CategoriesSlice = {
  categories: TCategory[];
  currentCategory: TCategory | null;
  currentSubCategories: TSubCategories | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: CategoriesSlice = {
  categories: [],
  currentCategory: null,
  currentSubCategories: null,
  isLoading: false,
  error: null
};

export const fetchGetCategories = createAsyncThunk(
  'categories/fetchGetCategories',
  async (_, { rejectWithValue }) => {
    try {
      return await getCategoriesApi();
    } catch {
      return rejectWithValue('Ошибка получения категорий');
    }
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    getCurrentCategoryById: (state, action: PayloadAction<string>) => {
      const category = state.categories.find(
        (cat) => cat.id === action.payload
      );
      state.currentCategory = category || null;
      state.currentSubCategories = null;
    },
    getCurrentSubCategoryById: (state, action: PayloadAction<string>) => {
      let foundSubCategory: TSubCategories | null = null;
      for (const category of state.categories) {
        const subCategory = category.subCategories.find(
          (sub) => sub.id === action.payload
        );
        if (subCategory) {
          foundSubCategory = subCategory;
          state.currentCategory = category;
          break;
        }
      }

      state.currentSubCategories = foundSubCategory;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchGetCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchGetCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export const { getCurrentCategoryById, getCurrentSubCategoryById } =
  categoriesSlice.actions;
export default categoriesSlice.reducer;
