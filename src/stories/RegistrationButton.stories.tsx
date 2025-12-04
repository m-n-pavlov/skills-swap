import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { RegistrationButton } from '../shared/ui';

const withRouter = (Story: any) => (
  <MemoryRouter>
    <Story />
  </MemoryRouter>
);

const meta: Meta<typeof RegistrationButton> = {
  title: 'UI/Buttons/RegisterButton',
  component: RegistrationButton,
  decorators: [withRouter],
  parameters: {
    layout: 'centered',
    actions: { argTypesRegex: '^on.*' }
  },
  argTypes: {
    to: {
      control: 'text',
      description: 'URL для навигации',
      defaultValue: '#'
    },
    children: {
      control: 'text',
      description: 'Текст кнопки',
      defaultValue: 'Зарегистрироваться'
    }
  }
};

export default meta;

type Story = StoryObj<typeof RegistrationButton>;

export const Default: Story = {
  args: {
    children: 'Зарегистрироваться',
    to: '#'
  }
};

export const WithCustomRoute: Story = {
  args: {
    children: 'Зарегистрироваться',
    to: '/register' // в будущем заменить заглушку на рабочий путь для теста (!)
  }
};
