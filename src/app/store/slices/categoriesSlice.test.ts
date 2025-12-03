import { vi, describe, it, expect } from 'vitest';
import type { TCategory } from '../../../entities/categories.ts';
import * as api from '../../../api';
import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer, { fetchGetCategories } from './categoriesSlice';

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

  it('Тест загрузки ингредиентов. Состояние fulfilled', async () => {
    vi.spyOn(api, 'getCategoriesApi').mockResolvedValue([...mockCategories]);
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
