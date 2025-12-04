import type { Meta, StoryObj } from '@storybook/react';

import { SearchInput } from '../shared/ui/SearchInput';

import { useState } from 'react';

const meta: Meta<typeof SearchInput> = {
  title: 'Components/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text' },
    placeholder: { control: 'text' },
    type: { control: 'radio', options: ['text', 'search'] },
    showClearButton: { control: 'boolean' },
    name: { control: 'text' },
    onChange: { action: 'changed' }, // покажет событие в панели Actions
    onClear: { action: 'cleared' },
    onClick: { action: 'clicked' }
  }
};

export default meta;

type Story = StoryObj<typeof SearchInput>;

// База. По умолчанию
export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value || '');

    return (
      <div style={{ padding: '20px', maxWidth: '400px' }}>
        <SearchInput
          {...args}
          value={value}
          onChange={(val) => {
            setValue(val);
            args.onChange?.(val);
          }}
        />
      </div>
    );
  },
  args: {
    name: 'search',
    placeholder: 'Искать навык',
    value: '',
    showClearButton: true
  }
};

// Состояние: поле заполнено → видна кнопка "очистить"
export const WithValue: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value || 'Текст');

    return (
      <div style={{ padding: '20px', maxWidth: '400px' }}>
        <SearchInput
          {...args}
          value={value}
          onChange={(val) => {
            setValue(val);
            args.onChange?.(val);
          }}
        />
      </div>
    );
  },
  args: {
    name: 'search',
    placeholder: 'Поиск...',
    value: 'Текст',
    showClearButton: true
  }
};

// Без кнопки очистки (даже если есть значение) (на всякий случай пусть будет)
export const WithoutClearButton: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value || 'Нельзя очистить');

    return (
      <div style={{ padding: '20px', maxWidth: '400px' }}>
        <SearchInput
          {...args}
          value={value}
          onChange={(val) => {
            setValue(val);
            args.onChange?.(val);
          }}
        />
      </div>
    );
  },
  args: {
    name: 'search',
    placeholder: 'Поиск без очистки',
    value: 'Нельзя очистить',
    showClearButton: false // ← ключевое
  }
};

// Тип 'text' вместо 'search'
export const TextInputType: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value || '');

    return (
      <div style={{ padding: '20px', maxWidth: '400px' }}>
        <SearchInput
          {...args}
          value={value}
          onChange={(val) => {
            setValue(val);
            args.onChange?.(val);
          }}
        />
      </div>
    );
  },
  args: {
    name: 'search-text',
    placeholder: 'Искать навык',
    type: 'text',
    showClearButton: true
  }
};
