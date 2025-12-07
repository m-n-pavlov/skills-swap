import { checkResponse, type TServerResponse } from '../utils/api.ts';
import type { TCity } from '../../entities/cities.ts';

type TCitiesResponse = TServerResponse<{
  cities: TCity[];
}>;

export const getCitiesApi = (): Promise<TCity[]> =>
  fetch('/api/cities')
    .then((res) => checkResponse<TCitiesResponse>(res))
    .then((data) => {
      if (data?.success) return data.cities;
      return Promise.reject(data);
    });
