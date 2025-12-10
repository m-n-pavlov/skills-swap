import type { TUser } from '../../entities/users.ts';
import type { TCity } from '../../entities/cities.ts';
import type { TSkill } from '../../entities/skills.ts';

// Новый тип пользователя с деталями
export type TUserWithDetails = Omit<
  TUser,
  'cityId' | 'skillsTeach' | 'skillsLearn'
> & {
  city: TCity | null;
  age: number;
  skillsTeach: (TSkill & { categoryName: string; subcategoryName: string })[];
  skillsLearn: (TSkill & { categoryName: string; subcategoryName: string })[];
};
