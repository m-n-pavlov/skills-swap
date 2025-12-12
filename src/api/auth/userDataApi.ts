import type { TUser } from '../../entities/users.ts';
import { checkResponse, type TServerResponse } from '../utils/api.ts';

export type TUpdatePayload = {
  userId: string;
  newEmail: string;
};

export const updateEmailApi = async (data: TUpdatePayload): Promise<TUser> => {
  const res = await fetch('/api/auth/update-email', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      userId: data.userId,
      email: data.newEmail
    })
  });
  const json = await checkResponse<TServerResponse<{ user: TUser }>>(res);
  return json.user;
};
