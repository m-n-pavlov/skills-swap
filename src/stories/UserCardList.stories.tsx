import type { Meta, StoryObj } from '@storybook/react';
import { UserCardList } from '../widgets/UserCardList';
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

export const Default: Story = {
  args: {
    onLike: (userId: string) => console.log('Liked user:', userId),
    onMore: (userId: string) => console.log('More actions for user:', userId)
  }
};
