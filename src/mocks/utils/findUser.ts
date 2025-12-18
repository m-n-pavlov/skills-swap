import type { TAuthUser } from '../../entities/authUser.ts';
import { HttpResponse } from 'msw';
import { authUsers } from './authStore.ts';

type FindUserResult = {
  user: TAuthUser | null;
  response: ReturnType<typeof HttpResponse.json> | null;
};

export const findUser = (userId: string): FindUserResult => {
  const user = authUsers.find((u) => u.id === userId);

  if (!user) {
    return {
      user: null,
      response: HttpResponse.json(
        {
          success: false,
          message: 'Пользователь не найден'
        },
        { status: 404 }
      )
    };
  }

  return {
    user,
    response: null
  };
};
