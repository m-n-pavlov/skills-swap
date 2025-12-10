import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { LoginButton } from '../shared/ui/LoginButton';

const meta: Meta<typeof LoginButton> = {
  title: 'UI/LoginButton',
  component: LoginButton,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    )
  ],
  parameters: {
    layout: 'centered'
  }
};

export default meta;
type Story = StoryObj<typeof LoginButton>;

export const Default: Story = {
  args: {
    to: '/login',
    children: 'Войти в систему'
  }
};
