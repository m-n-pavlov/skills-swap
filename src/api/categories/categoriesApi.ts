import type { TCategory, TSubCategories } from '../../entities/categories.ts';
import type { TServerResponse } from '../utils/api.ts';
import { checkResponse } from '../utils/api.ts';

type TCategoriesResponse = TServerResponse<{
  categories: TCategory[];
}>;

type TSubCategoriesResponse = TServerResponse<{
  subCategories: TSubCategories[];
}>;

type TSubCategoryResponse = TServerResponse<{
  subCategory: TSubCategories;
}>;

export const getCategoriesApi = (): Promise<TCategory[]> =>
  fetch('/api/categories')
    .then((res) => checkResponse<TCategoriesResponse>(res))
    .then((data) => {
      if (data?.success) return data.categories;
      return Promise.reject(data);
    });

export const getSubcategoriesFindByCategoryIdApi = (
  categoryId: string
): Promise<TSubCategories[]> =>
  fetch(`/api/categories/${categoryId}`)
    .then((res) => checkResponse<TSubCategoriesResponse>(res))
    .then((data) => {
      console.log(data);
      if (data?.success) return data.subCategories;
      return Promise.reject(data);
    });

export const getSubcategoryFindById = (
  subCategoryId: string
): Promise<TSubCategories | null> =>
  fetch(`/api/subcategories/${subCategoryId}`)
    .then((res) => checkResponse<TSubCategoryResponse>(res))
    .then((data) => {
      if (data?.success && data.subCategory) {
        return data.subCategory;
      }
      return null;
    });
