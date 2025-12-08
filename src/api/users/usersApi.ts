import { checkResponse, type TServerResponse } from '../utils/api.ts';
import type { TUser } from '../../entities/users.ts';

type TUserResponse = TServerResponse<{
  users: TUser[];
}>;

export const getUsersApi = (): Promise<TUser[]> =>
  fetch('/api/users')
    .then((res) => checkResponse<TUserResponse>(res))
    .then((data) => {
      if (data?.success) return data.users;
      return Promise.reject(data);
    });
