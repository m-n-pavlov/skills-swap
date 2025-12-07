import { http, HttpResponse } from 'msw';

export const citiesHandlers = [
  http.get('/api/cities', async () => {
    const response = await fetch('/db/cities.json');
    const data = await response.json();
    return HttpResponse.json(data);
  }),

  http.get('/api/cities:cityId', async (req) => {
    const { cityId } = req.params;
    const response = await fetch('/db/cities.json');
    const data = await response.json();
    const city = data.cities.find((c: any) => c.id === cityId);
    return HttpResponse.json({
      success: true,
      city: city
    });
  })
];
