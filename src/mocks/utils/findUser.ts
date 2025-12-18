import type { TAuthUser } from '../../entities/authUser.ts';
import { HttpResponse } from 'msw';
import { authUsers } from './authStore.ts';

export const findUser = (
  userId: string
): { user: TAuthUser; response?: HttpResponse<any> } => {
  const user = authUsers.find((u) => u.id === userId);
  if (!user) {
    return {
      user: null as any,
      response: HttpResponse.json(
        { success: false, message: 'Пользователь не найден' },
        { status: 404 }
      )
    };
  }
  return { user };
};
