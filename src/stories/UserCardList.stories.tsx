import type { Meta, StoryObj } from '@storybook/react';
import { UserCardList } from '../widgets/UserCardList';
import { MemoryRouter } from 'react-router-dom';

const mockSkill = {
  name: 'Управление командой',
  shortDescription: 'Помогу выстроить процессы.',
  description: 'Подробно...',
  categoryId: 'business',
  subcategoryId: 'team_management'
};

const mockUser1 = {
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
};

const mockUser2 = {
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
};

const mockUsers = [mockUser1, mockUser2];

const meta: Meta<typeof UserCardList> = {
  title: 'widgets/UserCardList',
  component: UserCardList,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    )
  ]
};

export default meta;

type Story = StoryObj<typeof UserCardList>;

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
