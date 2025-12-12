import { checkResponse, type TServerResponse } from '../utils/api.ts';
import type { TAuthUser } from '../../entities/authUser.ts';

export type TUpdatePayload = {
  user: TAuthUser;
  newEmail: string;
};

export type TLikePayload = {
  user: TAuthUser;
  cardId: string;
};

export type TOffersPayload = {
  user: TAuthUser;
  skillId: string;
};

export const updateEmailApi = async (
  data: TUpdatePayload
): Promise<TAuthUser> => {
  const res = await fetch('/api/auth/update-email', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      userId: data.user.id,
      email: data.newEmail
    })
  });
  const json = await checkResponse<TServerResponse<{ user: TAuthUser }>>(res);
  return json.user;
};

export const toggleLikeApi = async (data: TLikePayload): Promise<TAuthUser> => {
  const res = await fetch('/api/auth/likes/toggle', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify({
      userId: data.user.id,
      targetId: data.cardId
    })
  });

  const json = await checkResponse<TServerResponse<{ user: TAuthUser }>>(res);
  return json.user;
};

export const toggleOffersApi = async (
  data: TOffersPayload
): Promise<TAuthUser> => {
  const res = await fetch('/api/auth/offers/toggle', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify({
      userId: data.user.id,
      targetId: data.skillId
    })
  });

  const json = await checkResponse<TServerResponse<{ user: TAuthUser }>>(res);
  return json.user;
};

if (import.meta.env.DEV) {
  (window as any).updateEmailApi = updateEmailApi;
  (window as any).toggleLikeApi = toggleLikeApi;
  (window as any).toggleOffersApi = toggleOffersApi;
}
