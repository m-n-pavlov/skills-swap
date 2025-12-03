import type { Meta, StoryObj } from '@storybook/react';
import Input from '../shared/ui/menu-link/input/input';
import { useState } from 'react';
const ExampleIcon = () => (
  <span style={{ fontSize: '18px', color: '#666' }}>📧</span>
);
export const InteractiveExample = () => {
  const [value, setValue] = useState('');
  return (
    <Input
      value={value}
      type='text'
      onChange={setValue}
      name='interactive'
      placeholder='Введите текст здесь'
      infoText='Попробуйте ввести текст'
      icon={<ExampleIcon />}
    />
  );
};

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text' },
    onChange: { action: 'changed' }
  }
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    type: 'text',
    placeholder: 'Введите текст',
    name: 'input',
    value: ''
  }
};

export const WithLabel: Story = {
  args: {
    ...Default.args,
    label: 'Имя пользователя'
  }
};

export const WithError: Story = {
  args: {
    ...Default.args,
    errorText: 'Это поле обязательно для заполнения'
  }
};

export const WithInfoText: Story = {
  args: {
    ...Default.args,
    infoText: 'Пароль должен содержать не менее 8 знаков',
    onChange: (value: string) => console.log(value)
  }
};

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Введите пароль',
    name: 'password',
    value: 'mypassword123',
    infoText: 'Пароль должен содержать не менее 8 знаков'
  }
};

export const Required: Story = {
  args: {
    ...Default.args,
    label: 'Email',
    required: true,
    placeholder: 'example@mail.ru'
  }
};

export const Autofocus: Story = {
  args: {
    ...Default.args,
    autofocus: true,
    label: 'Поиск'
  }
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    value: 'Нельзя изменить'
  }
};
