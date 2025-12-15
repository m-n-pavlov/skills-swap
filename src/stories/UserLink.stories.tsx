import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { UserButtonUI } from '../shared/ui/UserButton';

const meta: Meta<typeof UserButtonUI> = {
  title: 'Shared/UserLinkUI',
  component: UserButtonUI,
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

type Story = StoryObj<typeof UserButtonUI>;

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
