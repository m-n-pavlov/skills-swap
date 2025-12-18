import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { DropdownInput } from '../shared/ui/DropdownInput/DropdownInput';
import type { DropdownOption } from '../shared/ui/DropdownInput/types';

const meta: Meta<typeof DropdownInput> = {
  title: 'UI/DropdownInput',
  component: DropdownInput
};

export default meta;

type Story = StoryObj<typeof DropdownInput>;

const options: DropdownOption[] = [
  { label: 'Не указан', value: 'unknown' },
  { label: 'Мужской', value: 'male' },
  { label: 'Женский', value: 'female' }
];

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<string>('');

    return (
      <DropdownInput
        label='Пол'
        placeholder='Не указан'
        options={options}
        type='default'
        size='medium'
        value={value}
        onChange={(nextValue) => setValue(nextValue as string)}
        onClick={() => {}}
      />
    );
  }
};

export const CheckboxList: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([]);

    return (
      <DropdownInput
        label='Категория навыка, которому хотите научиться'
        placeholder='Выберите категорию'
        options={[
          { label: 'Бизнес и карьера', value: 'business' },
          { label: 'Творчество и искусство', value: 'art' },
          { label: 'Иностранные языки', value: 'languages' },
          { label: 'Здоровье и лайфстайл', value: 'health' },
          { label: 'Дом и уют', value: 'home' }
        ]}
        type='checkbox'
        size='large'
        value={value}
        onChange={(nextValue) => setValue(nextValue as string[])}
        onClick={() => {}}
      />
    );
  }
};
