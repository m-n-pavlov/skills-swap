// UserCardList.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { UserCardList } from '../widgets/UserCardList';
import type { TUser } from '../entities/users.ts';
import { MemoryRouter } from 'react-router-dom';

const meta: Meta<typeof UserCardList> = {
  title: 'Components/UserCardList',
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

// Моковые данные для трёх пользователей
const usersMock: TUser[] = [
  {
    id: '1',
    name: 'Мария',
    avatarUrl: 'https://i.pravatar.cc/100?img=5',
    cityId: 'saint_petersburg',
    gender: 'female',
    birthday: '1996-12-01',
    skillsTeach: ['1'],
    skillsLearn: ['2', '3'],
    likes: 0,
    createdAt: '2025-12-07'
  },
  {
    id: '2',
    name: 'Алексей',
    avatarUrl: 'https://i.pravatar.cc/100?img=6',
    cityId: 'moscow',
    gender: 'male',
    birthday: '1990-05-12',
    skillsTeach: ['3'],
    skillsLearn: ['1', '2'],
    likes: 5,
    createdAt: '2025-11-30'
  },
  {
    id: '3',
    name: 'Екатерина',
    avatarUrl: 'https://i.pravatar.cc/100?img=7',
    cityId: 'novosibirsk',
    gender: 'female',
    birthday: '1992-07-22',
    skillsTeach: ['3'],
    skillsLearn: ['1', '2'],
    likes: 2,
    createdAt: '2025-12-01'
  }
];

export const Default: Story = {
  args: {
    users: usersMock,
    onLike: (userId: string) => console.log('Liked user:', userId),
    onMore: (userId: string) => console.log('More actions for user:', userId)
  }
};
