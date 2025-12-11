import { http, HttpResponse } from 'msw';
import data from '../../../public/db/auth.json';

export const mockUsers = data.users;

export const authHandlers = [
  http.post('/api/auth/login', async ({ request }) => {
    const { email, password } = (await request.json()) as any;
    const user = mockUsers.find(
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
        message: 'Неверный email или пароль'
      },
      { status: 401 }
    );
  }),

  // Логаут
  http.post('/api/auth/logout', async ({}) => {
    return HttpResponse.json({
      success: true,
      message: 'Выход выполнен успешно'
    });
  }),

  // Регистрация
  http.post('/api/auth/register', async ({ request }) => {
    const newUser = (await request.json()) as any;
    const existingUser = mockUsers.find((u) => u.email === newUser.email);
    if (existingUser) {
      return HttpResponse.json(
        {
          success: false,
          message: 'Пользователь с таким email уже существует'
        },
        { status: 400 }
      );
    }
    const nextId = (mockUsers.length + 1).toString();
    const userToStore = { ...newUser, id: nextId };
    mockUsers.push(userToStore);
    const { password, ...userWithoutPassword } = userToStore;
    return HttpResponse.json({
      success: true,
      user: userWithoutPassword,
      message: 'Пользователь успешно зарегистрирован'
    });
  })
];
