import type { Meta, StoryObj } from '@storybook/react';
import { MenuLink } from './Menu-link';

const meta: Meta<typeof MenuLink> = {
  title: 'Example/MenuLink',
  component: MenuLink
};
export default meta;

type Story = StoryObj<typeof MenuLink>;

export const Default: Story = {
  args: {
    label: 'О проекте',
    href: '#'
  }
};

export const Active: Story = {
  args: {
    label: 'Все навыки',
    href: '#',
    isActive: true
  }
};
