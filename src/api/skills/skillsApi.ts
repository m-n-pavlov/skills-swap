import { checkResponse, type TServerResponse } from '../utils/api.ts';
import type { TSkill } from '../../entities/skills.ts';

type TSkillsResponse = TServerResponse<{
  skills: TSkill[];
}>;

export const getSkillsApi = (): Promise<TSkill[]> =>
  fetch('/api/skills')
    .then((res) => checkResponse<TSkillsResponse>(res))
    .then((data) => {
      if (data?.success) return data.skills;
      return Promise.reject(data);
    });
