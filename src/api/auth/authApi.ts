import { checkResponse, type TServerResponse } from '../utils/api.ts';
import type { TUser } from '../../entities/users.ts';

export type TLoginData = {
  email: string;
  password: string;
};

export type TAuthResponse = TServerResponse<{
  user: TUser;
}>;

export const loginApi = (data: TLoginData) =>
  fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  }).then((res) => checkResponse<TAuthResponse>(res));

export const logoutApi = (userId?: string) =>
  fetch('/api/auth/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      userId
    })
  }).then((res) => checkResponse<TServerResponse<{}>>(res));

export const registerApi = (data: FormData) =>
  fetch('/api/auth/register', {
    method: 'POST',
    body: data
  }).then((res) => checkResponse<TAuthResponse>(res));
