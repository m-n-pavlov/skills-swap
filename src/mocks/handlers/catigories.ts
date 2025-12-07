import { http, HttpResponse } from 'msw';

export const categoriesHandlers = [
  http.get('/api/categories', async () => {
    const response = await fetch('/db/categories.json');
    const data = await response.json();
    return HttpResponse.json(data);
  }),

  http.get('/api/categories/:categoryId', async (req) => {
    const { categoryId } = req.params;
    const response = await fetch('/db/categories.json');
    const data = await response.json();
    const category = data.categories.find((c: any) => c.id === categoryId);
    return HttpResponse.json({
      success: true,
      subCategories: category.subCategories
    });
  }),

  http.get('/api/subcategories/:subCategoryId', async (req) => {
    const { subCategoryId } = req.params;
    const response = await fetch('/db/categories.json');
    const data = await response.json();
    let subCategory = null;
    for (const cat of data.categories) {
      subCategory = cat.subCategories.find(
        (sc: any) => sc.id === subCategoryId
      );
      if (subCategory) break;
    }
    return HttpResponse.json({ success: true, subCategory });
  })
];
