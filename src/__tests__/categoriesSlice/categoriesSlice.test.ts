import type { TCategory } from '../../entities/categories.ts';
import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer, {
  type CategoriesSlice,
  fetchCategoryById,
  fetchGetCategories,
  fetchSubCategoryById
} from '../../app/store/slices/categoriesSlice/categoriesSlice.ts';

jest.mock('../../api', () => ({
  getCategoriesApi: jest.fn()
}));

import * as api from '../../api';

function expectPendingState(
  state: CategoriesSlice,
  isLoading: boolean,
  err: string | null
) {
  expect(state.categories).toEqual([]);
  expect(state.currentCategory).toEqual(null);
  expect(state.currentSubCategories).toEqual(null);
  expect(state.isLoading).toEqual(isLoading);
  expect(state.error).toEqual(err);
}

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
    expectPendingState(store.getState().categories, true, null);
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
    expectPendingState(store.getState().categories, false, err);
  });

  test('Тест поиска категории по ID. Состояние pending', async () => {
    (api.getCategoriesApi as jest.Mock).mockResolvedValue(mockCategories);
    const store = configureStore({
      reducer: { categories: categoriesReducer }
    });
    store.dispatch({ type: fetchCategoryById.pending.type });
    expectPendingState(store.getState().categories, true, null);
  });

  test('Тест поиска категории по ID. Состояние fulfilled', async () => {
    (api.getCategoriesApi as jest.Mock).mockResolvedValue(mockCategories);
    const store = configureStore({
      reducer: { categories: categoriesReducer }
    });
    await store.dispatch(fetchCategoryById('business'));
    const { currentCategory, isLoading, error } = store.getState().categories;
    expect(currentCategory).toEqual(
      mockCategories.find((cat) => cat.id === 'business')
    );
    expect(isLoading).toBe(false);
    expect(error).toBeNull();
  });

  test('Тест поиска категории по ID. Состояние rejected', async () => {
    const err = 'Ошибка получения категории по ID';
    jest.spyOn(api, 'getCategoriesApi').mockRejectedValue(new Error(err));
    const store = configureStore({
      reducer: { categories: categoriesReducer }
    });
    await store.dispatch(fetchCategoryById('business'));
    expectPendingState(store.getState().categories, false, err);
  });

  test('Тест поиска подкатегории по ID. Состояние pending', async () => {
    (api.getCategoriesApi as jest.Mock).mockResolvedValue(mockCategories);
    const store = configureStore({
      reducer: { categories: categoriesReducer }
    });
    store.dispatch({ type: fetchSubCategoryById.pending.type });
    expectPendingState(store.getState().categories, true, null);
  });

  test('Тест поиска подкатегории по ID. Состояние fulfilled', async () => {
    (api.getCategoriesApi as jest.Mock).mockResolvedValue(mockCategories);
    const store = configureStore({
      reducer: { categories: categoriesReducer }
    });
    await store.dispatch(fetchSubCategoryById('marketing'));
    const { currentSubCategories, isLoading, error } =
      store.getState().categories;
    const expectedSubCategory = mockCategories
      .find((cat) => cat.id === 'business') // родительская категория
      ?.subCategories.find((sub) => sub.id === 'marketing');
    expect(currentSubCategories).toEqual(expectedSubCategory);
    expect(isLoading).toBe(false);
    expect(error).toBeNull();
  });

  test('Тест поиска подкатегории по ID. Состояние rejected', async () => {
    const err = 'Ошибка получения подкатегории по ID';
    jest.spyOn(api, 'getCategoriesApi').mockRejectedValue(new Error(err));
    const store = configureStore({
      reducer: { categories: categoriesReducer }
    });
    await store.dispatch(fetchSubCategoryById('marketing'));
    expectPendingState(store.getState().categories, false, err);
  });
});
