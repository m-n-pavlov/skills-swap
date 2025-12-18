import type { Meta, StoryObj } from '@storybook/react';
import { AccountDropdown } from '../widgets/AccountDropdown/AccountDropdown.tsx';

const meta = {
  title: 'Widgets/AccountDropdown',
  component: AccountDropdown,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light'
    }
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Открыто ли выпадающее меню'
    },
    onClose: {
      action: 'closed',
      description: 'Функция закрытия меню'
    },
    onLogout: {
      action: 'logout',
      description: 'Функция выхода из аккаунта'
    }
  }
} satisfies Meta<typeof AccountDropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

const DropdownDecorator = (Story: any) => (
  <div style={{ position: 'relative', padding: '100px', minHeight: '200px' }}>
    <Story />
  </div>
);

export const Open: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log('Menu closed'),
    onLogout: () => console.log('User logged out')
  },
  decorators: [DropdownDecorator]
};

export const Closed: Story = {
  args: {
    isOpen: false,
    onClose: () => console.log('Menu closed'),
    onLogout: () => console.log('User logged out')
  },
  decorators: [DropdownDecorator]
};
