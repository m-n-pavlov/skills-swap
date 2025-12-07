import { http, HttpResponse } from 'msw';

export const usersHandlers = [
  http.get('/api/users', async () => {
    const response = await fetch('/db/users.json');
    const data = await response.json();
    return HttpResponse.json(data);
  })
];
