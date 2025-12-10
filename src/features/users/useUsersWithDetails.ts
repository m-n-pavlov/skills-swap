import { useMemo } from 'react';
import { useSelector } from 'react-redux';

// Селекторы соответствующих слайсов, возвращают исходные массивы объектов
import { selectAllUsers } from '../../app/store/slices/usersSlice/userSelector.ts';
import { selectAllSkills } from '../../app/store/slices/skillsSlice/skillsSelector.ts';
import { selectAllCities } from '../../app/store/slices/citiesSlice/citiesSelector.ts';
import { selectAllCategories } from '../../app/store/slices/categoriesSlice/categoriesSelector.ts';

// Утилита для рассчета возвраста пользователя
import { calculateAge } from './lib/calculateAge.ts';

// Тип возвращаемого хуком значения
import type { TUserWithDetails } from './type.ts';

// Импорт типа TSkill для приведения типов внутри mapSkills
import type { TSkill } from '../../entities/skills.ts';

// Сам кастомный хук для получения расширенного объекта пользователя
export const useUsersWithDetails = (): TUserWithDetails[] => {
  const users = useSelector(selectAllUsers);
  const skills = useSelector(selectAllSkills);
  const cities = useSelector(selectAllCities);
  const categories = useSelector(selectAllCategories);

  return useMemo(() => {
    // Создаём быстрый доступ к объектам по их id
    const cityMap = new Map(cities.map((city) => [city.id, city]));
    const skillMap = new Map(skills.map((skill) => [skill.id, skill]));
    const categoryMap = new Map(categories.map((cat) => [cat.id, cat]));

    // Преобразуем массив ID навыков в массив объектов с дополнительными полями categoryName и subcategoryName
    const mapSkills = (skillIds: string[]) =>
      skillIds
        .map((skillId) => {
          const skill = skillMap.get(skillId);
          if (!skill) return null; // если навык не найден, пропускаем

          const category = categoryMap.get(skill.categoryId);
          const subcategory =
            category?.subCategories.find(
              (sub) => sub.id === skill.subcategoryId
            ) || null;

          return {
            ...skill,
            categoryName: category?.name || '',
            subcategoryName: subcategory?.name || ''
          };
        })
        .filter(Boolean) as (TSkill & {
        categoryName: string;
        subcategoryName: string;
      })[];

    // Возвращаем новый массив пользователей с вложенными объектами city, вычисленным age и полными объектами навыков
    return users.map((user) => ({
      ...user,
      city: cityMap.get(user.cityId) || null,
      age: calculateAge(user.birthday),
      skillsTeach: mapSkills(user.skillsTeach),
      skillsLearn: mapSkills(user.skillsLearn)
    }));
  }, [users, skills, cities, categories]);
};
