import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { UserCard } from '../shared/ui/UserCard';

const mockSkill1 = {
  name: 'Управление командой',
  shortDescription: 'Помогу выстроить процессы в команде.',
  description: 'Подробное описание навыка...',
  categoryId: 'business',
  subcategoryId: 'team_management'
};

const mockSkill2 = {
  name: 'React',
  shortDescription: 'Разработка на React',
  description: 'Опытный разработчик React-приложений.',
  categoryId: 'tech',
  subcategoryId: 'react'
};

const mockUser = {
  id: 'user-123',
  name: 'Тест Пользователь',
  avatarUrl: '/images/users/konstantin.png',
  cityId: 'moscow',
  gender: 'other',
  likes: 24,
  createdAt: '2024-01-01',
  age: 30,
  location: 'Москва',
  skillsTeach: [mockSkill1],
  skillsLearn: [mockSkill2]
};

const meta: Meta<typeof UserCard> = {
  title: 'UI/UserCard',
  component: UserCard,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    )
  ]
};

export default meta;

type Story = StoryObj<typeof UserCard>;

export const Default: Story = {
  args: {
    user: mockUser,
    showLinkButton: true,
    onLike: (id) => console.log('Like:', id),
    onMore: (id) => console.log('More:', id),
    isLiked: false
  }
};

export const WithoutLinkButton: Story = {
  args: {
    user: mockUser,
    showLinkButton: false
  }
};
