import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { RegisterButton } from '../shared/ui/registration-button/';

const withRouter = (Story: any) => (
  <MemoryRouter>
    <Story />
  </MemoryRouter>
);

const meta: Meta<typeof RegisterButton> = {
  title: 'UI/Buttons/RegisterButton',
  component: RegisterButton,
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

type Story = StoryObj<typeof RegisterButton>;

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
