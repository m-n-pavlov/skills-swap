// CardsGallery.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { CardsGallery } from '../../src/widgets/CardsGallery';
// import users from '../../public/db/users.json';
// import type { TUser } from '../entities/users';

// const mockUsers = users.users;

const meta: Meta<typeof CardsGallery> = {
  title: 'widgets/CardsGallery',
  component: CardsGallery,
  argTypes: {
    users: {
      control: 'object',
      description: 'Массив пользователей для отображения в галерее',
      table: {
        type: { summary: 'TUser[]' }
      }
    }
  },
  args: {
    // users: mockUsers as TUser[]
  }
};

export default meta;
type Story = StoryObj<typeof CardsGallery>;

export const Default: Story = {
  args: {
    // users: mockUsers as TUser[]
  }
};
