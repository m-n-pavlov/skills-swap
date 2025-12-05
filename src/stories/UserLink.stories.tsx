import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { UserLinkUI } from '../shared/ui/UserLink';

const meta: Meta<typeof UserLinkUI> = {
  title: 'Shared/UserLinkUI',
  component: UserLinkUI,
  args: {
    href: '#',
    size: 'small'
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    )
  ]
};

export default meta;

type Story = StoryObj<typeof UserLinkUI>;

export const Guest: Story = {
  args: {
    name: undefined,
    avatarUrl: undefined
  }
};

export const WithName: Story = {
  args: {
    name: 'Мария',
    avatarUrl: 'https://placehold.co/100x100'
  }
};
