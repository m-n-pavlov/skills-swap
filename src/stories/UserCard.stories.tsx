import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { UserCard } from '../shared/ui/UserCard';

const meta: Meta<typeof UserCard> = {
  title: 'Components/UserCard',
  component: UserCard
};
export default meta;

type Story = StoryObj<typeof UserCard>;

export const Default: Story = {
  render: (args) => (
    <MemoryRouter>
      <UserCard {...args} />
    </MemoryRouter>
  ),
  args: {}
};
