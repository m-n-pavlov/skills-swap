import type { TCategory } from '../../../entities/categories.ts';
import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer, { fetchGetCategories } from './categoriesSlice';

jest.mock('../../../api', () => ({
  getCategoriesApi: jest.fn()
}));

import * as api from '../../../api';

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

  test('Тест загрузки ингредиентов. Состояние fulfilled', async () => {
    (api.getCategoriesApi as jest.Mock).mockResolvedValue(mockCategories);
    const store = configureStore({
      reducer: { categories: categoriesReducer }
    });
    await store.dispatch(fetchGetCategories());
    const { categories, isLoading, error } = store.getState().categories;
    expect(categories).toEqual(mockCategories);
    expect(isLoading).toEqual(false);
    expect(error).toEqual(null);
  });
});
