import type { TCategory } from '../../entities/categories.ts';
import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer, {
  type CategoriesSlice,
  fetchGetCategories,
  getCurrentCategoryById,
  getCurrentSubCategoryById
} from '../../app/store/slices/categoriesSlice/categoriesSlice.ts';

jest.mock('../../api', () => ({
  getCategoriesApi: jest.fn()
}));

import * as api from '../../api';

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

  const initialState: CategoriesSlice = {
    categories: mockCategories,
    currentCategory: mockCategories[0],
    currentSubCategories: mockCategories[0].subCategories[0],
    isLoading: false,
    error: null
  };

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
  //
  test('Тест поиска категории по ID', () => {
    const store = configureStore({
      reducer: { categories: categoriesReducer },
      preloadedState: {
        categories: { ...initialState, categories: mockCategories }
      }
    });
    store.dispatch(getCurrentCategoryById('business'));
    const state = store.getState().categories;
    expect(state.currentCategory).toEqual(mockCategories[0]);
    expect(state.currentSubCategories).toEqual(null);
    expect(state.isLoading).toEqual(false);
    expect(state.error).toEqual(null);
  });

  //
  test('Тест поиска подкатегории по ID', () => {
    const store = configureStore({
      reducer: { categories: categoriesReducer },
      preloadedState: {
        categories: { ...initialState, categories: mockCategories }
      }
    });
    store.dispatch(getCurrentSubCategoryById('marketing'));
    const state = store.getState().categories;
    expect(state.currentSubCategories).toEqual(
      mockCategories[0].subCategories[1]
    );
    expect(state.currentCategory).toEqual(mockCategories[0]);
    expect(state.isLoading).toEqual(false);
    expect(state.error).toEqual(null);
  });
});
