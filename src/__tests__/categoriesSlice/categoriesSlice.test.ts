import type { TCategory } from '../../entities/categories.ts';
import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer, {
  fetchGetCategories
} from '../../app/store/slices/categoriesSlice/categoriesSlice.ts';

jest.mock('../../api', () => ({
  getCategoriesApi: jest.fn()
}));

import * as api from '../../api';
import {
  selectAllCategories,
  selectCategoryById,
  selectSubCategoryById
} from '../../app/store/slices/categoriesSlice/categoriesSelector.ts';
import type { RootState } from '../../app/store';

describe('Проверяют редьюсер слайса для категорий', () => {
  const mockCategories: TCategory[] = [
    {
      id: 'business',
      name: 'Бизнес и карьера',
      subCategories: [
        {
          id: 'team_management',
          name: 'Управление командой'
        },
        {
          id: 'marketing',
          name: 'Маркетинг и реклама'
        }
      ]
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Тест загрузки категорий. Состояние pending', async () => {
    (api.getCategoriesApi as jest.Mock).mockResolvedValue(mockCategories);
    const store = configureStore({
      reducer: { categories: categoriesReducer }
    });
    store.dispatch({ type: fetchGetCategories.pending.type });
    const state = store.getState().categories;
    expect(state.categories).toEqual([]);
    expect(state.currentCategory).toEqual(null);
    expect(state.currentSubCategories).toEqual(null);
    expect(state.isLoading).toEqual(true);
    expect(state.error).toEqual(null);
  });

  test('Тест загрузки категорий. Состояние fulfilled', async () => {
    (api.getCategoriesApi as jest.Mock).mockResolvedValue(mockCategories);

    const store = configureStore({
      reducer: { categories: categoriesReducer }
    });
    await store.dispatch(fetchGetCategories());
    const {
      categories,
      currentCategory,
      currentSubCategories,
      isLoading,
      error
    } = store.getState().categories;
    expect(categories).toEqual(mockCategories);
    expect(currentCategory).toEqual(null);
    expect(currentSubCategories).toEqual(null);
    expect(isLoading).toEqual(false);
    expect(error).toEqual(null);
  });

  test('Тест загрузки категорий. Состояние rejected', async () => {
    const err = 'Ошибка получения категорий';
    jest.spyOn(api, 'getCategoriesApi').mockRejectedValue(new Error(err));
    const store = configureStore({
      reducer: { categories: categoriesReducer }
    });
    await store.dispatch(fetchGetCategories());
    const state = store.getState().categories;
    expect(state.categories).toEqual([]);
    expect(state.currentCategory).toEqual(null);
    expect(state.currentSubCategories).toEqual(null);
    expect(state.isLoading).toEqual(false);
    expect(state.error).toEqual(err);
  });

  const mockState = {
    categories: {
      categories: mockCategories,
      currentCategory: null,
      currentSubCategories: null,
      isLoading: false,
      error: null
    }
  } as RootState;

  test('Тест селектора получения списка категорий', () => {
    expect(selectAllCategories(mockState)).toEqual(mockCategories);
  });

  test('Тест селектора получения категории по ID', () => {
    expect(selectCategoryById(mockState, mockCategories[0].id)).toEqual(
      mockCategories[0]
    );
    expect(selectCategoryById(mockState, 'unknown')).toBeNull();
  });

  test('Тест селектора получения подкатегории по ID', () => {
    const selectSub = selectSubCategoryById();
    expect(selectSub(mockState, mockCategories[0].subCategories[1].id)).toEqual(
      mockCategories[0].subCategories[1]
    );
    expect(selectSub(mockState, 'unknown')).toBeNull();
  });
});
