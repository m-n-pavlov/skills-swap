import type { TCity } from '../../entities/cities.ts';
import { configureStore } from '@reduxjs/toolkit';
import citiesReducer, {
  type CitiesSlice,
  fetchGetCities,
  getCurrentCityById
} from '../../app/store/slices/citiesSclice/citiesSlice.ts';

jest.mock('../../api', () => ({
  getCitiesApi: jest.fn()
}));
import * as api from '../../api';
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

  const initialState: CitiesSlice = {
    cities: mockCities,
    currentCity: mockCities[1],
    isLoading: false,
    error: null
  };

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

  test('Тест поиска города по ID. Состояние fulfilled', async () => {
    const store = configureStore({
      reducer: { cities: citiesReducer },
      preloadedState: {
        cities: { ...initialState, cities: mockCities }
      }
    });
    store.dispatch(getCurrentCityById(mockCities[1].id));
    const { currentCity, isLoading, error } = store.getState().cities;
    expect(currentCity).toEqual(mockCities[1]);
    expect(isLoading).toEqual(false);
    expect(error).toEqual(null);
  });
});
