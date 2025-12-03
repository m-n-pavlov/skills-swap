import { http, HttpResponse } from 'msw';

export const categoriesHandlers = [
  http.get('/api/categories', async () => {
    const response = await fetch('/db/categories.json');
    const data = await response.json();
    return HttpResponse.json(data);
  })
];
