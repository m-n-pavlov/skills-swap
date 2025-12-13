import { checkResponse, type TServerResponse } from '../utils/api.ts';
import type { TAuthUser } from '../../entities/authUser.ts';

export type TUpdatePayload = {
  user: TAuthUser;
  updates: Partial<
    Pick<
      TAuthUser,
      'email' | 'name' | 'birthday' | 'gender' | 'cityId' | 'description'
    >
  >;
};

export type TLikePayload = {
  user: TAuthUser;
  cardId: string;
};

export type TOffersPayload = {
  user: TAuthUser;
  skillId: string;
};

export const updateProfileApi = async (
  data: TUpdatePayload
): Promise<TAuthUser> => {
  const res = await fetch('/api/auth/update-profile', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      userId: data.user.id,
      updates: data.updates
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
