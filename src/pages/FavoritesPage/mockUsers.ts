import type { TUserWithDetails } from '../../features/users';

export const mockUsers: TUserWithDetails[] = [
  {
    id: '16',
    name: 'Сергей',
    age: 30,
    gender: 'male',
    avatarUrl: '/images/users/konstantin.png',
    location: 'Уфа',
    cityId: 'ufa',
    likes: 0,
    createdAt: '2024-05-14',

    skillsTeach: [
      {
        name: 'Матрица Эйзенхауэра',
        shortDescription: 'Система приоритизации задач по срочности и важности',
        description:
          'Практическое применение матрицы Эйзенхауэра для эффективного планирования, фокусировки на важных задачах и избегания прокрастинации.',
        categoryId: 'business',
        subcategoryId: 'time_management'
      }
    ],

    skillsLearn: [
      {
        name: 'Испанский',
        shortDescription:
          'Постановка правильного произношения и изучение азов грамматики',
        description:
          'Начальный курс, фокусирующийся на особенностях испанского произношения и базовых грамматических структурах для построения простых предложений.',
        categoryId: 'language',
        subcategoryId: 'spanish'
      },
      {
        name: 'Мелкий ремонт',
        shortDescription: 'Самостоятельный ремонт в доме',
        description:
          'Навыки проведения мелкого бытового ремонта: замена розеток и выключателей, устранение протечек, работа с инструментами и материалами.',
        categoryId: 'home',
        subcategoryId: 'repair'
      }
    ]
  },
  {
    id: '14',
    name: 'Павел',
    age: 32,
    gender: 'male',
    avatarUrl: '/images/users/ivan.png',
    location: 'Челябинск',
    cityId: 'chelyabinsk',
    likes: 22,
    createdAt: '2024-08-07',

    skillsTeach: [
      {
        name: 'Акварель',
        shortDescription: 'Начальные техники рисования акварелью',
        description:
          'Основные приёмы работы с акварельными красками: выбор бумаги, смешивание цветов и создание композиций.',
        categoryId: 'art',
        subcategoryId: 'drawing'
      }
    ],

    skillsLearn: [
      {
        name: 'Контент',
        shortDescription: 'Позиционирование себя как эксперта через контент',
        description:
          'Пошаговая инструкция по созданию контента, который демонстрирует экспертизу и привлекает целевую аудиторию.',
        categoryId: 'business',
        subcategoryId: 'personal_brand'
      },
      {
        name: 'Быстрые ужины',
        shortDescription: 'Меню и приготовление ужинов на всю неделю',
        description:
          'Система планирования и приготовления вкусных ужинов на неделю: подбор продуктов, подготовка и хранение для экономии времени.',
        categoryId: 'home',
        subcategoryId: 'cooking'
      },
      {
        name: 'Декор бутылок',
        shortDescription: 'Создание морского декора из бутылок',
        description:
          'Техника декорирования стеклянных бутылок в морском стиле с использованием шнуров, ракушек, песка и других природных материалов.',
        categoryId: 'art',
        subcategoryId: 'diy'
      }
    ]
  },
  {
    id: '15',
    name: 'Ольга',
    age: 39,
    gender: 'female',
    avatarUrl: '/images/users/sofia.png',
    location: 'Самара',
    cityId: 'samara',
    likes: 8,
    createdAt: '2025-03-18',

    skillsTeach: [
      {
        name: 'Французский',
        shortDescription: 'Базовый разговорный французский для туристов',
        description:
          'Практический курс, направленный на освоение повседневной лексики и базовых фраз для путешествий, общения и ориентации во Франции и других франкоязычных странах.',
        categoryId: 'language',
        subcategoryId: 'french'
      }
    ],

    skillsLearn: [
      {
        name: 'Немецкий',
        shortDescription:
          'Системное изучение одной из самых сложных тем немецкого языка',
        description:
          'Подробный разбор системы артиклей (определённых, неопределённых и нулевых), а также их влияние на склонение существительных, прилагательных и местоимений.',
        categoryId: 'language',
        subcategoryId: 'german'
      }
    ]
  }
];
