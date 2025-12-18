import { useSelector } from 'react-redux';
import { useMemo } from 'react';

import { selectAllUsers } from '../../app/store/slices/usersSlice/userSelector.ts';
import { selectAllSkills } from '../../app/store/slices/skillsSlice/skillsSelector.ts';
import { selectAllCities } from '../../app/store/slices/citiesSlice/citiesSelector.ts';

import { calculateAge } from './lib/calculateAge.ts';

import type { TSkill } from '../../entities/skills.ts';
import type { TUser } from '../../entities/users.ts';

type TSkillWithoutId = Omit<TSkill, 'id'>;

export type TUserWithDetails = Omit<
  TUser,
  'birthday' | 'skillsTeach' | 'skillsLearn'
> & {
  age: number;
  location: string;
  skillsTeach: TSkillWithoutId[];
  skillsLearn: TSkillWithoutId[];
};

export const useUsersWithDetails = (): TUserWithDetails[] => {
  const users = useSelector(selectAllUsers);
  const skills = useSelector(selectAllSkills);
  const cities = useSelector(selectAllCities);

  const skillsMap = useMemo(
    () => new Map(skills.map((skill) => [skill.id, skill])),
    [skills]
  );

  const citiesMap = useMemo(
    () => new Map(cities.map((city) => [city.id, city.location])),
    [cities]
  );

  const usersWithDetails = useMemo(() => {
    return users.map((user) => {
      const location = citiesMap.get(user.cityId) || 'Неизвестный город';
      const age = calculateAge(user.birthday);

      const teachSkills: TSkillWithoutId[] = user.skillsTeach
        .map((skillId) => {
          const skill = skillsMap.get(skillId);
          if (!skill) return null;

          const { id, ...skillWithoutId } = skill;
          return skillWithoutId;
        })
        .filter((skill): skill is TSkillWithoutId => skill !== null);

      const learnSkills: TSkillWithoutId[] = user.skillsLearn
        .map((skillId) => {
          const skill = skillsMap.get(skillId);
          if (!skill) return null;

          const { id, ...skillWithoutId } = skill;
          return skillWithoutId;
        })
        .filter((skill): skill is TSkillWithoutId => skill !== null);

      return {
        id: user.id,
        name: user.name,
        avatarUrl: user.avatarUrl,
        cityId: user.cityId,
        location,
        gender: user.gender,
        age,
        skillsTeach: teachSkills,
        skillsLearn: learnSkills,
        likes: user.likes,
        createdAt: user.createdAt
      };
    });
  }, [users, skillsMap, citiesMap]);

  return usersWithDetails;
};
