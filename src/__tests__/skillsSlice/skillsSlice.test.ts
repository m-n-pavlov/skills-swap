jest.mock('../../api', () => ({
  getSkillsApi: jest.fn()
}));
import * as api from '../../api';
import { configureStore } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import type { TSkill } from '../../entities/skills.ts';
import skillsReducer, {
  fetchGetSkills
} from '../../app/store/slices/skillsSlice/skillsSlice.ts';
import {
  selectAllSkills,
  selectSkillsById
} from '../../app/store/slices/skillsSlice/skillsSelector.ts';
describe('Проверяют редьюсер слайса для навыков', () => {
  const mockSkills: TSkill[] = [
    {
      id: '1',
      name: 'Построение системы KPI',
      shortDescription:
        'Методы разработки ключевых показателей эффективности для команды',
      description:
        'Подробное руководство по созданию и внедрению системы KPI, которая помогает отслеживать производительность команды, ставить измеримые цели и мотивировать сотрудников на достижение результатов.',
      categoryId: 'business',
      subcategoryId: 'team_management',
      images: [
        'images/skills/1.jpg',
        'images/skills/no_images_4.jpg',
        'images/skills/no_images_1.jpg',
        'images/skills/no_images_3.jpg',
        'images/skills/no_images_4.jpg'
      ]
    },
    {
      id: '2',
      name: 'SMM-стратегия для B2B',
      shortDescription:
        'Разработка стратегии продвижения в социальных сетях для бизнеса',
      description:
        'Полное руководство по созданию эффективной SMM-стратегии для B2B-компаний: от анализа аудитории и выбора платформ до контент-плана и измерения результатов.',
      categoryId: 'business',
      subcategoryId: 'marketing',
      images: [
        'images/skills/2.jpg',
        'images/skills/no_images_1.jpg',
        'images/skills/no_images_3.jpg',
        'images/skills/no_images_2.jpg',
        'images/skills/no_images_4.jpg'
      ]
    },
    {
      id: '3',
      name: 'Метод SPIN в продажах',
      shortDescription: 'Техника ведения сложных переговоров и закрытия сделок',
      description:
        'Освоение методики SPIN (Ситуация, Проблема, Извлечение, Нужда) для эффективного выявления потребностей клиентов и увеличения конверсии в продажах.',
      categoryId: 'business',
      subcategoryId: 'sales_and_negotiations',
      images: [
        'images/skills/3.jpg',
        'images/skills/no_images_1.jpg',
        'images/skills/no_images_2.jpg',
        'images/skills/no_images_3.jpg',
        'images/skills/no_images_4.jpg'
      ]
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Тест загрузки навыков. Состояние pending', async () => {
    (api.getSkillsApi as jest.Mock).mockResolvedValue(mockSkills);
    const store = configureStore({
      reducer: { skills: skillsReducer }
    });
    store.dispatch({ type: fetchGetSkills.pending.type });
    const { skills, currentSkill, isLoading, error } = store.getState().skills;
    expect(skills).toEqual([]);
    expect(currentSkill).toEqual(null);
    expect(isLoading).toEqual(true);
    expect(error).toEqual(null);
  });

  test('Тест загрузки навыков. Состояние fulfilled', async () => {
    (api.getSkillsApi as jest.Mock).mockResolvedValue(mockSkills);
    const store = configureStore({
      reducer: { skills: skillsReducer }
    });
    await store.dispatch(fetchGetSkills());
    const { skills, currentSkill, isLoading, error } = store.getState().skills;
    expect(skills).toEqual(mockSkills);
    expect(currentSkill).toEqual(null);
    expect(isLoading).toEqual(false);
    expect(error).toEqual(null);
  });

  test('Тест загрузки навыков. Состояние rejected', async () => {
    const err = 'Ошибка получения списка навыков';
    jest.spyOn(api, 'getSkillsApi').mockRejectedValue(new Error(err));
    const store = configureStore({
      reducer: { skills: skillsReducer }
    });
    await store.dispatch(fetchGetSkills());
    const { skills, currentSkill, isLoading, error } = store.getState().skills;
    expect(skills).toEqual([]);
    expect(currentSkill).toEqual(null);
    expect(isLoading).toEqual(false);
    expect(error).toEqual(err);
  });

  const mockState = {
    skills: {
      skills: mockSkills,
      currentSkill: null,
      isLoading: false,
      error: null
    }
  } as RootState;

  test('Тест селектора получения списка навыков', () => {
    expect(selectAllSkills(mockState)).toEqual(mockSkills);
  });

  test('Тест селектора получения навыков по ID', () => {
    expect(selectSkillsById(mockSkills[2].id)(mockState)).toEqual(
      mockSkills[2]
    );
    expect(selectSkillsById('unknown')(mockState)).toBeNull();
  });
});
