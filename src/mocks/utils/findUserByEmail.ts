import type { TAuthUser } from '../../entities/authUser.ts';
import { HttpResponse } from 'msw';

export function findUserByEmail(
  users: TAuthUser[],
  newEmail: string,
  currentUserId?: string
):
  | { busy: false }
  | {
      busy: true;
      response: HttpResponse<{ success: false; message: string }>;
    } {
  const exists = users.some(
    (u) => u.email === newEmail && u.id !== currentUserId
  );

  if (!exists) return { busy: false };

  return {
    busy: true,
    response: HttpResponse.json<{ success: false; message: string }>(
      {
        success: false,
        message: 'Пользователь с такой электронной почтой уже существует'
      },
      { status: 400 }
    )
  };
}
