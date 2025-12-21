import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TextArea } from '../shared/ui/TextArea';
import type { TextAreaProps } from '../shared/ui/TextArea/type';

const meta: Meta<typeof TextArea> = {
  title: 'UI/Textarea',
  component: TextArea,
  argTypes: {
    onChange: { action: 'changed' },
    value: { control: 'text' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    errorText: { control: 'text' },
    required: { control: 'boolean' },
    maxLength: { control: 'number' },
    minLength: { control: 'number' }
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

const TextareaWithState = (props: TextAreaProps) => {
  const [value, setValue] = useState(props.value || '');
  return <TextArea {...props} value={value} onChange={setValue} />;
};

export const Default: Story = {
  render: (args) => <TextareaWithState {...args} />,
  args: {
    label: 'Описание',
    placeholder: 'Коротко опишите, чему можете научить',
    name: 'description',
    required: true,
    maxLength: 500,
    minLength: 10
  }
};

export const WithError: Story = {
  render: (args) => <TextareaWithState {...args} />,
  args: {
    label: 'Описание',
    placeholder: 'Коротко опишите, чему можете научить',
    name: 'description',
    required: true,
    value: '',
    errorText: 'Поле является обязательным'
  }
};
