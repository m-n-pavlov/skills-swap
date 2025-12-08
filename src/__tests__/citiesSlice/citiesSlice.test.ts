import type { TCity } from '../../entities/cities.ts';
import { configureStore } from '@reduxjs/toolkit';
import citiesReducer, {
  fetchGetCities
} from '../../app/store/slices/citiesSclice/citiesSlice.ts';

jest.mock('../../api', () => ({
  getCitiesApi: jest.fn()
}));
import * as api from '../../api';

import type { RootState } from '../../app/store';
import {
  selectAllCities,
  selectCityById
} from '../../app/store/slices/citiesSclice/citiesSelector.ts';
describe('Проверяют редьюсер слайса для городов', () => {
  const mockCities: TCity[] = [
    {
      id: 'moscow',
      location: 'Москва'
    },
    {
      id: 'saint_petersburg',
      location: 'Санкт-Петербург'
    },
    {
      id: 'novosibirsk',
      location: 'Новосибирск'
    },
    {
      id: 'yekaterinburg',
      location: 'Екатеринбург'
    },
    {
      id: 'kazan',
      location: 'Казань'
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Тест загрузки городов. Состояние pending', async () => {
    (api.getCitiesApi as jest.Mock).mockResolvedValue(mockCities);
    const store = configureStore({
      reducer: { cities: citiesReducer }
    });
    store.dispatch({ type: fetchGetCities.pending.type });
    const { cities, currentCity, isLoading, error } = store.getState().cities;
    expect(cities).toEqual([]);
    expect(currentCity).toEqual(null);
    expect(isLoading).toEqual(true);
    expect(error).toEqual(null);
  });

  test('Тест загрузки городов. Состояние fulfilled', async () => {
    (api.getCitiesApi as jest.Mock).mockResolvedValue(mockCities);
    const store = configureStore({
      reducer: { cities: citiesReducer }
    });
    await store.dispatch(fetchGetCities());
    const { cities, currentCity, isLoading, error } = store.getState().cities;
    expect(cities).toEqual(mockCities);
    expect(currentCity).toEqual(null);
    expect(isLoading).toEqual(false);
    expect(error).toEqual(null);
  });

  test('Тест загрузки городов. Состояние rejected', async () => {
    const err = 'Ошибка получения списка городов';
    jest.spyOn(api, 'getCitiesApi').mockRejectedValue(new Error(err));
    const store = configureStore({
      reducer: { cities: citiesReducer }
    });
    await store.dispatch(fetchGetCities());
    const { cities, currentCity, isLoading, error } = store.getState().cities;
    expect(cities).toEqual([]);
    expect(currentCity).toEqual(null);
    expect(isLoading).toEqual(false);
    expect(error).toEqual(err);
  });

  const mockState = {
    cities: {
      cities: mockCities,
      currentCity: null,
      isLoading: false,
      error: null
    }
  } as RootState;

  test('Тест селектора получения списка городов', () => {
    expect(selectAllCities(mockState)).toEqual(mockCities);
  });

  test('Тест селектора получения городов по ID', () => {
    expect(selectCityById(mockCities[2].id)(mockState)).toEqual(mockCities[2]);
    expect(selectCityById('unknown')(mockState)).toBeNull();
  });
});
