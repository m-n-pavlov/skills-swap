import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { MenuLink } from '../shared/ui/MenuLink';

const meta: Meta<typeof MenuLink> = {
  title: 'Shared/MenuLink',
  component: MenuLink,
  args: {
    label: 'О проекте',
    href: '/'
  }
};

export default meta;

type Story = StoryObj<typeof MenuLink>;

export const Default: Story = {
  render: (args) => (
    <MemoryRouter initialEntries={['/']}>
      <MenuLink {...args} />
    </MemoryRouter>
  )
};

export const Active: Story = {
  args: {
    label: 'Все навыки',
    href: '/skills'
  },
  render: (args) => (
    <MemoryRouter initialEntries={['/skills']}>
      <MenuLink {...args} />
    </MemoryRouter>
  )
};
