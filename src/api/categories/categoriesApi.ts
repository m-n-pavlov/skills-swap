import type { TCategory } from '../../entities/categories.ts';
import type { TServerResponse } from '../utils/api.ts';
import { checkResponse } from '../utils/api.ts';

type TCategoriesResponse = TServerResponse<{
  categories: TCategory[];
}>;

export const getCategoriesApi = (): Promise<TCategory[]> =>
  fetch('/api/categories')
    .then((res) => checkResponse<TCategoriesResponse>(res))
    .then((data) => {
      if (data?.success) return data.categories;
      return Promise.reject(data);
    });
