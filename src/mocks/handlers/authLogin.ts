import { http, HttpResponse } from 'msw';
import { authUsers } from '../utils/authStore.ts';

export const authLoginHandlers = [
  http.post('/api/auth/login', async ({ request }) => {
    const { email, password } = (await request.json()) as any;
    const user = authUsers.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      const { password, ...userWithoutPassword } = user;
      return HttpResponse.json({
        success: true,
        user: userWithoutPassword,
        message: 'Вход выполнен успешно'
      });
    }

    return HttpResponse.json(
      {
        success: false,
        message:
          'Email или пароль введён неверно. Пожалуйста проверьте правильность введённых данных'
      },
      { status: 401 }
    );
  }),

  http.post('/api/auth/logout', async ({}) => {
    return HttpResponse.json({
      success: true,
      message: 'Выход выполнен успешно'
    });
  })
];
