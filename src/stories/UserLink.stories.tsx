import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { UserLinkUI } from '../shared/ui/UserLink';

const meta: Meta<typeof UserLinkUI> = {
  title: 'Shared/UserLinkUI',
  component: UserLinkUI,
  args: {
    href: '/profile',
    size: 'small'
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div style={{ padding: 16, background: '#f9faf7' }}>
          <Story />
        </div>
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

export const LargeAvatar: Story = {
  args: {
    name: 'Иван',
    size: 'large',
    avatarUrl: 'https://placehold.co/150x150'
  }
};
