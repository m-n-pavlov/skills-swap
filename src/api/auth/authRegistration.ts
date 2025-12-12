import type { TAuthUser } from '../../entities/authUser.ts';
import { checkResponse, type TServerResponse } from '../utils/api.ts';
import type { TSkill } from '../../entities/skills.ts';

export type TRegisterPayload = {
  email: string;
  password: string;
  name: string;
  birthday: string;
  gender: string;
  cityId: string;
  description: string;
  learningCategoryId: string;
  learningSubCategoryId: string;
  skillsTeach: TSkill;
  avatarFile: File | null;
  skillsImageFile: File | null;
};

export const registerApi = async (data: TRegisterPayload) => {
  const fd = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value instanceof File) fd.append(key, value);
    else if (value !== null) fd.append(key, String(value));
  });
  fd.set('skillsTeach', JSON.stringify(data.skillsTeach));
  const res = await fetch('/api/auth/register', { method: 'POST', body: fd });
  return checkResponse<TServerResponse<{ user: TAuthUser }>>(res).then(
    (r) => r.user
  );
};
