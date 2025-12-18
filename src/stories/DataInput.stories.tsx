import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DateInput } from '../shared/ui/DateInput';

const meta: Meta<typeof DateInput> = {
  title: 'UI/DateInput',
  component: DateInput,
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: 'date changed' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' }
  }
};

export default meta;

type Story = StoryObj<typeof DateInput>;

export const Default: Story = {
  args: {
    placeholder: 'дд.мм.гггг'
  },
  render: (args) => {
    const [date, setDate] = useState<Date | null>(null);
    return <DateInput {...args} value={date} onChange={setDate} />;
  }
};

export const WithValue: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(new Date(1995, 9, 28));
    return <DateInput value={date} onChange={setDate} />;
  }
};

export const Disabled: Story = {
  args: {
    placeholder: 'Недоступно',
    disabled: true
  },
  render: (args) => {
    const [date, setDate] = useState<Date | null>(null);
    return <DateInput {...args} value={date} onChange={setDate} />;
  }
};
