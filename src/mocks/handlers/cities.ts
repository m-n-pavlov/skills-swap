import { http, HttpResponse } from 'msw';

export const citiesHandlers = [
  http.get('/api/cities', async () => {
    const response = await fetch('/db/cities.json');
    const data = await response.json();
    return HttpResponse.json(data);
  })
];
