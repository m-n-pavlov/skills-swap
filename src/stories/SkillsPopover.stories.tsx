import type { Meta, StoryObj } from '@storybook/react';
import { SkillsPopover } from '../widgets/SkillsPopover';
import type { TCategory } from '../entities/categories.ts';

const meta: Meta<typeof SkillsPopover> = {
  title: 'widgets/SkillsPopover',
  component: SkillsPopover,
  decorators: [
    (Story) => (
      <div style={{ paddingInlineStart: 320 }}>
        <Story />
      </div>
    )
  ]
};
const mockCategories: TCategory[] = [
  {
    id: 'business',
    name: 'Бизнес и карьера',
    subCategories: [
      {
        id: 'team_management',
        name: 'Управление командой'
      },
      {
        id: 'marketing',
        name: 'Маркетинг и реклама'
      },
      {
        id: 'sales_and_negotiations',
        name: 'Продажи и переговоры'
      },
      {
        id: 'personal_brand',
        name: 'Личный бренд'
      },
      {
        id: 'resume',
        name: 'Резюме и собеседование'
      },
      {
        id: 'time_management',
        name: 'Тайм-менеджмент'
      },
      {
        id: 'project_management',
        name: 'Проектное управление'
      },
      {
        id: 'entrepreneurship',
        name: 'Предпринимательство'
      }
    ]
  },
  {
    id: 'language',
    name: 'Иностранные языки',
    subCategories: [
      {
        id: 'english',
        name: 'Английский'
      },
      {
        id: 'french',
        name: 'Французский'
      },
      {
        id: 'spanish',
        name: 'Испанский'
      },
      {
        id: 'german',
        name: 'Немецкий'
      },
      {
        id: 'chinese',
        name: 'Китайский'
      },
      {
        id: 'japanese',
        name: 'Японский'
      },
      {
        id: 'preparing_for_exams',
        name: 'Подготовка к экзаменам'
      }
    ]
  },
  {
    id: 'home',
    name: 'Дом и уют',
    subCategories: [
      {
        id: 'cleaning',
        name: 'Уборка и организация'
      },
      {
        id: 'home_finances',
        name: 'Домашние финансы'
      },
      {
        id: 'cooking',
        name: 'Приготовление еды'
      },
      {
        id: 'house_plants',
        name: 'Домашние растения'
      },
      {
        id: 'repair',
        name: 'Ремонт'
      },
      {
        id: 'storing_things',
        name: 'Хранение вещей'
      }
    ]
  },
  {
    id: 'art',
    name: 'Творчество и искусство',
    subCategories: [
      {
        id: 'drawing',
        name: 'Рисование и иллюстрация'
      },
      {
        id: 'photo',
        name: 'Фотография'
      },
      {
        id: 'video_editing',
        name: 'Видеомонтаж'
      },
      {
        id: 'music',
        name: 'Музыка и звук'
      },
      {
        id: 'acting',
        name: 'Актёрское мастерство'
      },
      {
        id: 'creative_writing',
        name: 'Креативное письмо'
      },
      {
        id: 'art_therapy',
        name: 'Арт-терапия'
      },
      {
        id: 'diy',
        name: 'Декор и DIY'
      }
    ]
  },
  {
    id: 'education',
    name: 'Образование и развитие',
    subCategories: [
      {
        id: '',
        name: 'Личностное развитие'
      },
      {
        id: 'skills',
        name: 'Навыки обучения'
      },
      {
        id: 'cognitive_techniques',
        name: 'Когнитивные техники'
      },
      {
        id: 'speed_reading',
        name: 'Скорочтение'
      },
      {
        id: 'teaching',
        name: 'Навыки преподавания'
      },
      {
        id: 'coaching',
        name: 'Коучинг'
      }
    ]
  },
  {
    id: 'health',
    name: 'Здоровье и лайфстайл',
    subCategories: [
      {
        id: 'yoga',
        name: 'Йога и медитация'
      },
      {
        id: 'nutrition',
        name: 'Питание и ЗОЖ'
      },
      {
        id: 'mental_health',
        name: 'Ментальное здоровье'
      },
      {
        id: 'mindfulness',
        name: 'Осознанность'
      },
      {
        id: 'workout',
        name: 'Физические тренировки'
      },
      {
        id: 'dream',
        name: 'Сон и восстановление'
      },
      {
        id: 'balance',
        name: 'Баланс жизни и работы'
      }
    ]
  }
];

export default meta;

type Story = StoryObj<typeof SkillsPopover>;

export const Primary: Story = {
  args: {
    categories: mockCategories,
    children: 'Primary button',
    onClick: (id, name) => {
      console.log('Selected:', id, name);
    }
  }
};
