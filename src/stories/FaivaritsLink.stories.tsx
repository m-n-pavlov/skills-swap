import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { FaivaritsLinkUI } from '../shared/ui/FaivaritsLink';
import type { FaivaritsLinkUIProps } from '../shared/ui/FaivaritsLink/type';

const meta: Meta<typeof FaivaritsLinkUI> = {
  title: 'Shared/FaivaritsLink',
  component: FaivaritsLinkUI,
  args: {
    href: '/',
    iconName: 'like',
    iconAlt: 'Добавить в избранное'
  } as FaivaritsLinkUIProps
};

export default meta;

type Story = StoryObj<typeof FaivaritsLinkUI>;

export const Default: Story = {
  args: {
    href: '/not-active'
  },
  render: (args) => (
    <MemoryRouter initialEntries={['/']}>
      <FaivaritsLinkUI {...args} />
    </MemoryRouter>
  )
};

export const Active: Story = {
  args: {
    href: '/favorites'
  },
  render: (args) => (
    <MemoryRouter initialEntries={['/favorites']}>
      <FaivaritsLinkUI {...args} />
    </MemoryRouter>
  )
};
