import type { TSkill } from './skills.ts';

export type TAuthUser = {
  id: string;
  email: string;
  password: string;

  name: string;
  avatarUrl: string;
  birthday: string;
  gender: 'male' | 'female' | 'other';
  cityId: string;
  description?: string;

  learningCategoryId: string;
  learningSubCategoryId: string;

  skillsTeach: TSkill;

  likes?: string[];
  exchangeOffers?: string[];

  created_at: string;
};
