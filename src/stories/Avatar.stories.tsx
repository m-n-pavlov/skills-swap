import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from '../shared/ui/Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Shared/Avatar',
  component: Avatar,
  args: {
    alt: 'User Avatar'
  }
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Small: Story = {
  args: {
    size: 'small',
    avatarUrl: 'https://i.pravatar.cc/48?img=5'
  }
};

export const Medium: Story = {
  args: {
    size: 'medium',
    avatarUrl: 'https://i.pravatar.cc/100?img=5'
  }
};

export const Large: Story = {
  args: {
    size: 'large',
    avatarUrl: 'https://i.pravatar.cc/244?img=5'
  }
};

export const WithoutAvatar: Story = {
  args: {
    size: 'medium',
    avatarUrl: undefined
  }
};
