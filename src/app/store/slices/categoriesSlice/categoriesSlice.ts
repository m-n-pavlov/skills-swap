import type {
  TCategory,
  TSubCategories
} from '../../../../entities/categories.ts';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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

export const fetchCategoryById = createAsyncThunk<
  TCategory | null,
  string,
  { rejectValue: string }
>('categories/fetchCategoryById', async (id, { rejectWithValue }) => {
  try {
    const categories = await getCategoriesApi();
    return categories.find((cat) => cat.id === id) || null;
  } catch {
    return rejectWithValue('Ошибка получения категории по ID');
  }
});

export const fetchSubCategoryById = createAsyncThunk<
  TSubCategories | null,
  string,
  { rejectValue: string }
>('categories/fetchSubCategoryById', async (id, { rejectWithValue }) => {
  try {
    const categories = await getCategoriesApi();
    for (const cat of categories) {
      const sub = cat.subCategories.find((sub) => sub.id === id);
      if (sub) {
        return sub;
      }
    }
    return rejectWithValue('Подкатегория не найдена');
  } catch {
    return rejectWithValue('Ошибка получения подкатегории по ID');
  }
});

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.currentCategory = null;
        state.currentSubCategories = null;
        state.categories = [];
      })
      .addCase(fetchGetCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.currentCategory = null;
        state.currentSubCategories = null;
        state.categories = action.payload;
      })
      .addCase(fetchGetCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.currentCategory = null;
        state.currentSubCategories = null;
        state.categories = [];
      });

    builder
      .addCase(fetchCategoryById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.currentCategory = null;
        state.currentSubCategories = null;
        state.categories = [];
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.currentCategory = action.payload;
        state.currentSubCategories = null;
        state.categories = [];
      })
      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.currentCategory = null;
        state.currentSubCategories = null;
        state.categories = [];
      });

    builder
      .addCase(fetchSubCategoryById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.currentCategory = null;
        state.currentSubCategories = null;
        state.categories = [];
      })
      .addCase(fetchSubCategoryById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.currentSubCategories = action.payload;
        state.currentCategory = null;
        state.categories = [];
      })
      .addCase(fetchSubCategoryById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.currentCategory = null;
        state.currentSubCategories = null;
        state.categories = [];
      });
  }
});

export default categoriesSlice.reducer;
