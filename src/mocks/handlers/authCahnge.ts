import { http, HttpResponse } from 'msw';
import type { TAuthUser } from '../../entities/authUser.ts';
import { findUser } from '../utils/findUser.ts';
import { findUserByEmail } from '../utils/findUserByEmail.ts';
import { authUsers, saveUserToLocalStorage } from '../utils/authStore.ts';

export const authUpdateHandlers = [
  http.patch('/api/auth/update-profile', async ({ request }) => {
    const { userId, updates } = (await request.json()) as {
      userId: string;
      updates: Partial<TAuthUser>;
    };

    const { user, response } = findUser(userId);
    if (response) return response;

    if (!user) {
      return HttpResponse.json(
        { success: false, message: 'Пользователь не найден' },
        { status: 404 }
      );
    }

    if (updates.email && updates.email !== user.email) {
      const check = findUserByEmail(authUsers, updates.email, userId);
      if (check.busy) return check.response;
    }

    const updatedUser = {
      ...user,
      ...updates,
      likes: updates.likes !== undefined ? updates.likes : user.likes,
      exchangeOffers:
        updates.exchangeOffers !== undefined
          ? updates.exchangeOffers
          : user.exchangeOffers
    };

    const userIndex = authUsers.findIndex((u) => u.id === userId);
    if (userIndex !== -1) {
      authUsers[userIndex] = updatedUser;
    }

    saveUserToLocalStorage(updatedUser);

    const { password, ...userWithoutPassword } = updatedUser;

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

    if (!user) {
      return HttpResponse.json(
        { success: false, message: 'Пользователь не найден' },
        { status: 404 }
      );
    }

    const currentLikes = user.likes || [];
    let newLikes: string[];

    if (currentLikes.includes(targetId)) {
      newLikes = currentLikes.filter((id) => id !== targetId);
    } else {
      newLikes = [...currentLikes, targetId];
    }

    const updatedUser = {
      ...user,
      likes: newLikes
    };

    const userIndex = authUsers.findIndex((u) => u.id === userId);
    if (userIndex !== -1) {
      authUsers[userIndex] = updatedUser;
    }

    saveUserToLocalStorage(updatedUser);

    const { password, ...userWithoutPassword } = updatedUser;

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

    if (!user) {
      return HttpResponse.json(
        { success: false, message: 'Пользователь не найден' },
        { status: 404 }
      );
    }

    const currentOffers = user.exchangeOffers ?? [];
    let newOffers: string[];

    if (currentOffers.includes(targetId)) {
      newOffers = currentOffers.filter((id) => id !== targetId);
    } else {
      newOffers = [...currentOffers, targetId];
    }

    const updatedUser = {
      ...user, // Сохраняем ВСЕ данные пользователя
      exchangeOffers: newOffers // Обновляем только предложения
    };

    const userIndex = authUsers.findIndex((u) => u.id === userId);
    if (userIndex !== -1) {
      authUsers[userIndex] = updatedUser;
    }

    saveUserToLocalStorage(updatedUser);

    const { password, ...userWithoutPassword } = updatedUser;

    return HttpResponse.json({
      success: true,
      user: userWithoutPassword,
      message: 'Предложение успешно обновлено'
    });
  })
];
