import { http, HttpResponse } from 'msw';

export const skillsHandlers = [
  http.get('/api/skills', async () => {
    const response = await fetch('/db/skills.json');
    const data = await response.json();
    return HttpResponse.json(data);
  })
];
