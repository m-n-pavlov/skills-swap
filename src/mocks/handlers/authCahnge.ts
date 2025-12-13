import data from '../../../public/db/auth.json';
import { http, HttpResponse } from 'msw';
import type { TAuthUser } from '../../entities/authUser.ts';
import { findUser } from '../utils/findUser.ts';
import { findUserByEmail } from '../utils/findUserByEmail.ts';

export const mockAuthUsers = data.users as TAuthUser[];

export const authUpdateHandlers = [
  http.patch('/api/auth/update-profile', async ({ request }) => {
    const { userId, updates } = (await request.json()) as {
      userId: string;
      updates: Partial<TAuthUser>;
    };
    const { user, response } = findUser(userId);
    if (response) return response;
    if (updates.email) {
      const check = findUserByEmail(mockAuthUsers, updates.email, userId);
      if (check.busy) return check.response;
    }
    Object.assign(user, updates);
    const { password, ...userWithoutPassword } = user;
    return HttpResponse.json({
      success: true,
      user: userWithoutPassword,
      message: 'Профиль пользователя успешно обновлён'
    });
  }),

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
      message: 'Лайк успешно обновлён'
    });
  }),

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
      message: 'Предложение успешно обновлено'
    });
  })
];
