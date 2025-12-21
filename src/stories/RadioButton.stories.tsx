import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RadioButton } from '../shared/ui/RadioButton/RadioButton.tsx';
import type { RadioButtonItem } from '../shared/ui/RadioButton/type.ts';

const meta: Meta<typeof RadioButton> = {
  title: 'UI/RadioButton',
  component: RadioButton
};

export default meta;

type Story = StoryObj<typeof RadioButton>;

export const WithLegend: Story = {
  render: (args) => {
    const [items, setItems] = useState<RadioButtonItem[]>(args.items || []);

    const handleChange = (value: string) => {
      setItems(
        items.map((item) => ({
          ...item,
          checked: item.value === value
        }))
      );
      args.onChange?.(value);
    };

    return <RadioButton {...args} items={items} onChange={handleChange} />;
  },
  args: {
    legend: 'Пол автора',
    name: 'authorGender',
    items: [
      { label: 'Не имеет значения', value: 'any' },
      { label: 'Мужской', value: 'male' },
      { label: 'Женский', value: 'female' }
    ]
  }
};

export const WithoutLegend: Story = {
  render: (args) => {
    const [items, setItems] = useState<RadioButtonItem[]>(args.items || []);

    const handleChange = (value: string) => {
      setItems(
        items.map((item) => ({
          ...item,
          checked: item.value === value
        }))
      );
      args.onChange?.(value);
    };

    return <RadioButton {...args} items={items} onChange={handleChange} />;
  },
  args: {
    name: 'options',
    items: [
      { label: 'Всё', value: 'all' },
      { label: 'Хочу научиться', value: 'learn' },
      { label: 'Могу научить', value: 'teach' }
    ]
  }
};

export const Controlled: Story = {
  render: (args) => {
    const [items, setItems] = useState<RadioButtonItem[]>(args.items || []);

    const handleChange = (value: string) => {
      setItems(
        items.map((item) => ({
          ...item,
          checked: item.value === value
        }))
      );
      args.onChange?.(value);
    };

    return <RadioButton {...args} items={items} onChange={handleChange} />;
  },
  args: {
    legend: 'Управляемая группа',
    name: 'letters',
    items: [
      { label: 'A', value: 'A', checked: true },
      { label: 'B', value: 'B' }
    ],
    onChange: (value) => console.log('Выбрано:', value)
  }
};
