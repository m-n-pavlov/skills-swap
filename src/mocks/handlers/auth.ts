import { http, HttpResponse } from 'msw';
import data from '../../../public/db/auth.json';

export const mockAuthUsers = data.users;

export const authHandlers = [
  // Авторизация
  http.post('/api/auth/login', async ({ request }) => {
    const { email, password } = (await request.json()) as any;
    const user = mockAuthUsers.find(
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

  // Логаут
  http.post('/api/auth/logout', async ({}) => {
    return HttpResponse.json({
      success: true,
      message: 'Выход выполнен успешно'
    });
  })

  // // Смена эл.почты пользователя
  // http.patch('/api/auth/update-email', async ({ request }) => {
  //   const { userId, email } = (await request.json()) as {
  //     userId: string;
  //     email: string;
  //   };
  //   const user = mockUsers.find((u) => u.id === userId);
  //   if (!user) {
  //     return HttpResponse.json(
  //         {
  //           success: false,
  //           message: 'Пользователь не найден'
  //         },
  //         { status: 404 }
  //     );
  //   }
  //   const emailBusy = mockUsers.some(
  //       (u) => u.email === email && u.id !== userId
  //   );
  //   if (emailBusy) {
  //     return HttpResponse.json(
  //         {
  //           success: false,
  //           message: 'Email уже занят другим пользователем'
  //         },
  //         { status: 400 }
  //     );
  //   }
  //   user.email = email;
  //   const { password, ...userWithoutPassword } = user;
  //   return HttpResponse.json({
  //     success: true,
  //     user: userWithoutPassword,
  //     message: 'Email успешно обновлён'
  //   });
  // }),
  //
  // // Регистрация
  // http.post('/api/auth/register', async ({ request }) => {
  //   const formData = await request.formData();
  //
  //   // Преобразуем в обычный объект
  //   const newUser: any = {};
  //   formData.forEach((value, key) => {
  //     newUser[key] = value;
  //   });
  //
  //   const existingUser = mockUsers.find((u) => u.email === newUser.email);
  //   if (existingUser) {
  //     return HttpResponse.json(
  //       {
  //         success: false,
  //         message: 'Пользователь с таким email уже существует'
  //       },
  //       { status: 400 }
  //     );
  //   }
  //
  //   const nextId = (mockUsers.length + 1).toString();
  //   const userToStore = { ...newUser, id: nextId };
  //   mockUsers.push(userToStore);
  //   const { password, ...userWithoutPassword } = userToStore;
  //
  //   return HttpResponse.json({
  //     success: true,
  //     user: userWithoutPassword,
  //     message: 'Пользователь успешно зарегистрирован'
  //   });
  // })
];
