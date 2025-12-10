import type { Meta, StoryObj } from '@storybook/react';
import Filters from '../shared/ui/Filters/Filters.tsx';

const meta: Meta<typeof Filters> = {
  title: 'Components/Filters',
  component: Filters,
  parameters: {
    layout: 'padded'
  }
};

export default meta;
type Story = StoryObj<typeof Filters>;

export const Default: Story = {
  args: {
    categories: [
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
      }
    ],
    cities: [
      {
        id: 'moscow',
        location: 'Москва'
      },
      {
        id: 'saint_petersburg',
        location: 'Санкт-Петербург'
      },
      {
        id: 'novosibirsk',
        location: 'Новосибирск'
      },
      {
        id: 'yekaterinburg',
        location: 'Екатеринбург'
      },
      {
        id: 'kazan',
        location: 'Казань'
      }
    ],
    onFiltersChange: (filters) => {
      console.log('Filters changed:', filters);
    }
  }
};

export const EmptyData: Story = {
  args: {
    categories: [],
    cities: [],
    onFiltersChange: (filters) => {
      console.log('Filters changed:', filters);
    }
  }
};
