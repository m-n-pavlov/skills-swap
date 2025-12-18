import type { Meta, StoryObj } from '@storybook/react';
import { CardsGallery } from '../../src/widgets/CardsGallery';
import { MemoryRouter } from 'react-router-dom';

const mockSkill = {
  name: 'Управление командой',
  shortDescription: 'Помогу выстроить процессы.',
  description: 'Подробно...',
  categoryId: 'business',
  subcategoryId: 'team_management'
};

const mockUsers = [
  {
    id: 'user-1',
    name: 'Анна',
    avatarUrl: '/images/users/darya.png',
    cityId: 'moscow',
    gender: 'female',
    likes: 12,
    createdAt: '2024-01-01',
    age: 28,
    location: 'Москва',
    skillsTeach: [mockSkill],
    skillsLearn: []
  },
  {
    id: 'user-2',
    name: 'Иван',
    avatarUrl: '/images/users/konstantin.png',
    cityId: 'saint_petersburg',
    gender: 'male',
    likes: 5,
    createdAt: '2024-02-01',
    age: 32,
    location: 'Санкт-Петербург',
    skillsTeach: [],
    skillsLearn: [mockSkill]
  },
  {
    id: 'user-3',
    name: 'Мария',
    avatarUrl: '/images/users/viktoria_1.png',
    cityId: 'novosibirsk',
    gender: 'female',
    likes: 20,
    createdAt: '2024-03-01',
    age: 26,
    location: 'Новосибирск',
    skillsTeach: [mockSkill],
    skillsLearn: []
  },
  {
    id: 'user-4',
    name: 'Алексей',
    avatarUrl: '/images/users/ivan.png',
    cityId: 'yekaterinburg',
    gender: 'male',
    likes: 3,
    createdAt: '2024-04-01',
    age: 30,
    location: 'Екатеринбург',
    skillsTeach: [],
    skillsLearn: [mockSkill]
  }
];

const meta: Meta<typeof CardsGallery> = {
  title: 'widgets/CardsGallery',
  component: CardsGallery,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div style={{ padding: '20px' }}>
          <Story />
        </div>
      </MemoryRouter>
    )
  ],
  argTypes: {
    users: {
      control: false,
      description: 'Массив пользователей для отображения в галерее'
    }
  }
  },
  args: {}
};

export default meta;

type Story = StoryObj<typeof CardsGallery>;

export const Default: Story = {
  args: {
    users: mockUsers,
    onLike: (userId) => console.log('Liked:', userId),
    onMore: (userId) => console.log('More about:', userId),
    getUserLikeData: (userId, userLikes) => {
      const isLiked = userId === 'user-1';
      return {
        isLiked,
        likesCount: userLikes
      };
    }
  }
};

export const Empty: Story = {
  args: {
    users: [],
    onLike: () => {},
    onMore: () => {},
    getUserLikeData: () => ({ isLiked: false, likesCount: 0 })
  }
  args: {}
};
