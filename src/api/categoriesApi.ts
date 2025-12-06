import type { TCategory } from '../entities/categories.ts';

const checkResponse = async <T>(res: Response): Promise<T> => {
  if (res.ok) {
    return res.json();
  } else {
    const err = await res.json().catch(() => ({}));
    return Promise.reject(err);
  }
};

type TServerResponse<T> = {
  success: boolean;
} & T;

type TCategoriesResponse = TServerResponse<{
  categories: TCategory[];
}>;

export const getCategoriesApi = (): Promise<TCategory[]> =>
  fetch('/api/categories')
    .then((res) => checkResponse<TCategoriesResponse>(res))
    .then((data) => {
      console.log(data.categories);
      if (data?.success) return data.categories;
      return Promise.reject(data);
    });
