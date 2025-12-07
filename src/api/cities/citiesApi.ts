import { checkResponse, type TServerResponse } from '../utils/api.ts';
import type { TCity } from '../../entities/cities.ts';

type TCitiesResponse = TServerResponse<{
  cities: TCity[];
}>;

type TCityResponse = TServerResponse<{
  city: TCity;
}>;

export const getCitiesApi = (): Promise<TCity[]> =>
  fetch('/api/cities')
    .then((res) => checkResponse<TCitiesResponse>(res))
    .then((data) => {
      if (data?.success) return data.cities;
      return Promise.reject(data);
    });

export const getCityByIdApi = (cityId: string): Promise<TCity> =>
  fetch(`/api/cities${cityId}`)
    .then((res) => checkResponse<TCityResponse>(res))
    .then((data) => {
      if (data?.success) return data.city;
      return Promise.reject(data);
    });
