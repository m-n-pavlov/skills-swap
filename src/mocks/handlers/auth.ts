import { http, HttpResponse } from 'msw';
import data from '../../../public/db/auth.json';

export const mockUsers = data.users;

export const authHandlers = [
  http.post('/api/auth/login', async ({ request }) => {
    const { email, password } = (await request.json()) as any;
    console.log('Login attempt:', email, password);

    const user = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      // Убираем пароль из ответа
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
  http.post('/api/auth/logout', async ({ request }) => {
    const data = (await request.json()) as any;

    console.log('Logout for user:', data.userId);

    // В реальном приложении здесь можно инвалидировать токен
    // Но так как мы используем localStorage - просто подтверждаем успех

    return HttpResponse.json({
      success: true,
      message: 'Выход выполнен успешно'
    });
  }),

  // Смена пароля
  http.patch('/api/auth/change-email', async ({ request }) => {
    const data = (await request.json()) as any;
    const { userId, ...updateData } = data;

    console.log('Update user:', userId, updateData);

    const userIndex = mockUsers.findIndex((u) => u.id === userId);

    if (userIndex === -1) {
      return HttpResponse.json(
        {
          success: false,
          message: 'Пользователь не найден'
        },
        { status: 404 }
      );
    }

    // Обновляем данные пользователя
    const updatedUser = {
      ...mockUsers[userIndex],
      ...updateData
    };

    mockUsers[userIndex] = updatedUser;

    // Убираем пароль из ответа
    const { password, ...userWithoutPassword } = updatedUser;

    return HttpResponse.json({
      success: true,
      user: userWithoutPassword,
      message: 'Данные пользователя обновлены'
    });
  }),

  http.get('/api/auth/user', async ({ request }) => {
    const userId = request.headers.get('X-User-Id');

    if (!userId) {
      return HttpResponse.json(
        {
          success: false,
          message: 'Не авторизован'
        },
        { status: 401 }
      );
    }

    const user = mockUsers.find((u) => u.id === userId);

    if (!user) {
      return HttpResponse.json(
        {
          success: false,
          message: 'Пользователь не найден'
        },
        { status: 404 }
      );
    }

    const { password, ...userWithoutPassword } = user;

    return HttpResponse.json({
      success: true,
      user: userWithoutPassword
    });
  })
];
