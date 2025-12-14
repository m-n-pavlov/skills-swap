import { checkResponse, type TServerResponse } from '../utils/api.ts';
import type { TAuthUser } from '../../entities/authUser.ts';

export type TLoginData = {
  login: string;
  password: string;
};

export type TAuthResponse = TServerResponse<{
  user: TAuthUser;
}>;

export const loginApi = async (data: TLoginData): Promise<TAuthUser> => {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      email: data.login,
      password: data.password
    })
  });
  const json = await checkResponse<TAuthResponse>(res);
  return json.user;
};

export const logoutApi = async (userId?: string): Promise<void> => {
  const res = await fetch('/api/auth/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ userId })
  });
  await checkResponse<TServerResponse<{}>>(res);
};
