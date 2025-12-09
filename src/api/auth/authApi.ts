import { checkResponse, type TServerResponse } from '../utils/api.ts';
import type { TUser } from '../../entities/users.ts';

export type TLoginData = {
  email: string;
  password: string;
};

export type TRegisterData = TUser & {
  email: string;
  password: string;
};

export type TAuthResponse = TServerResponse<{
  user: TUser;
}>;

export type TChangeEmailResponse = TAuthResponse & {
  email: string;
};

export const loginApi = (data: TLoginData) =>
  fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  })
    .then((res) => checkResponse<TAuthResponse>(res))
    .then((data) => {
      if (data?.success) {
        if (data.user) localStorage.setItem('user', JSON.stringify(data.user));
        return data;
      }
      return Promise.reject(data);
    });

export const logoutApi = () =>
  fetch('/api/auth/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      userId: JSON.parse(localStorage.getItem('user') || '{}')?.id
    })
  })
    .then((res) => checkResponse<TServerResponse<{}>>(res))
    .then((data) => {
      if (data?.success) {
        localStorage.removeItem('user');
      }
      return data;
    });

export const updateApi = (data: Partial<TRegisterData>) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return fetch('/api/auth/change-email', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'X-User-Id': user.id
    },
    body: JSON.stringify({
      userId: user.id,
      ...data
    })
  })
    .then((res) => checkResponse<TChangeEmailResponse>(res))
    .then((data) => {
      if (data?.success) {
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
        }
        return data;
      }
      return Promise.reject(data);
    });
};
