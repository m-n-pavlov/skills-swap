import data from '../../../public/db/auth.json';
import { http, HttpResponse } from 'msw';
import type { TAuthUser } from '../../entities/authUser.ts';

export const mockAuthUsers = data.users as TAuthUser[];

http.patch('/api/auth/update-email', async ({ request }) => {
  const { userId, email } = (await request.json()) as {
    userId: string;
    email: string;
  };
  const { user, response } = findUser(userId);
  if (response) return response;
  const emailBusy = mockAuthUsers.some(
    (u) => u.email === email && u.id !== userId
  );
  if (emailBusy) {
    return HttpResponse.json(
      { success: false, message: 'Email уже занят' },
      { status: 400 }
    );
  }
  user.email = email;
  const { password, ...userWithoutPassword } = user;
  return HttpResponse.json({
    success: true,
    user: userWithoutPassword,
    message: 'Email успешно обновлён'
  });
});

http.post('/api/auth/likes/toggle', async ({ request }) => {
  const { userId, targetId } = (await request.json()) as {
    userId: string;
    targetId: string;
  };
  const { user, response } = findUser(userId);
  if (response) return response;
  user.likes = user.likes || [];
  if (user.likes.includes(targetId)) {
    user.likes = user.likes.filter((id) => id !== targetId);
  } else {
    user.likes.push(targetId);
  }
  const { password, ...userWithoutPassword } = user;
  return HttpResponse.json({
    success: true,
    user: userWithoutPassword,
    message: 'Лайк обновлён'
  });
});

http.post('/api/auth/offers/toggle', async ({ request }) => {
  const { userId, targetId } = (await request.json()) as {
    userId: string;
    targetId: string;
  };
  const { user, response } = findUser(userId);
  if (response) return response;
  user.exchangeOffers = user.exchangeOffers ?? [];
  if (user.exchangeOffers.includes(targetId)) {
    user.exchangeOffers = user.exchangeOffers.filter((id) => id !== targetId);
  } else {
    user.exchangeOffers.push(targetId);
  }
  const { password, ...userWithoutPassword } = user;
  return HttpResponse.json({
    success: true,
    user: userWithoutPassword,
    message: 'Предложение обновлено'
  });
});

export const findUser = (
  userId: string
): { user: TAuthUser; response?: HttpResponse<any> } => {
  const user = mockAuthUsers.find((u) => u.id === userId);
  if (!user) {
    return {
      user: null as any, // TS нужно "обмануть", но мы сразу проверяем
      response: HttpResponse.json(
        { success: false, message: 'Пользователь не найден' },
        { status: 404 }
      )
    };
  }
  return { user };
};
