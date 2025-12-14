import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Checkbox } from '../shared/ui/Checkbox';
import type { CheckboxItem } from '../shared/ui/Checkbox/types';

type CheckboxProps = React.ComponentProps<typeof Checkbox>;

const meta: Meta<CheckboxProps> = {
  title: 'ui/Checkbox',
  component: Checkbox,
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Отображать или скрывать список'
    },
    legend: {
      control: 'text',
      description: 'Необязательный заголовок'
    }
  }
};

export default meta;

// 1. Интерактивный список
export const Interactive: StoryObj = {
  render: () => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const items: CheckboxItem[] = [
      { id: '1', label: 'Рисование и иллюстрация' },
      { id: '2', label: 'Фотография' },
      { id: '3', label: 'Видеомонтаж' },
      { id: '4', label: 'Музыка и звук' },
      { id: '5', label: 'Актёрское мастерство' },
      { id: '6', label: 'Креативное письмо' }
    ];

    const handleChange = (id: string) => {
      setSelectedIds((prev) =>
        prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
      );
    };

    return (
      <div>
        <Checkbox
          items={items}
          isOpen={true}
          legend='Навыки'
          onChange={handleChange}
          selectedIds={selectedIds}
        />
      </div>
    );
  }
};

// 2. Без заголовка
export const WithoutLegend: StoryObj = {
  render: () => {
    const [selectedIds, setSelectedIds] = useState<string[]>(['2']);

    const items: CheckboxItem[] = [
      { id: '1', label: 'Декор и DIY' },
      { id: '2', label: 'Креативное письмо' },
      { id: '3', label: 'Фотография' }
    ];

    const handleChange = (id: string) => {
      setSelectedIds((prev) =>
        prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
      );
    };

    return (
      <Checkbox
        items={items}
        isOpen={true}
        onChange={handleChange}
        selectedIds={selectedIds}
      />
    );
  }
};

// 3. Скрытый список
export const Closed: StoryObj<CheckboxProps> = {
  args: {
    items: [{ id: '1', label: 'Тест' }],
    isOpen: false,
    legend: 'Скрытый фильтр',
    selectedIds: [],
    onChange: () => {}
  }
};

// 4. Категории с подпунктами (расширяемые)
export const WithExpandableCategories: StoryObj = {
  render: () => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [expandedIds, setExpandedIds] = useState<string[]>([]);

    const items: CheckboxItem[] = [
      { id: 'category-1', label: 'Творчество и искусство' },
      { id: 'sub-1', label: 'Рисование и иллюстрация' },
      { id: 'sub-2', label: 'Фотография' },
      { id: 'sub-3', label: 'Видеомонтаж' },
      { id: 'sub-4', label: 'Музыка и звук' }
    ];

    // ID категорий, которые можно раскрывать
    const expandableIds = ['category-1'];

    const handleChange = (id: string) => {
      setSelectedIds((prev) =>
        prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
      );
    };

    const handleToggleExpand = (id: string) => {
      setExpandedIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    };

    return (
      <div style={{ maxWidth: '300px' }}>
        <Checkbox
          items={items}
          selectedIds={selectedIds}
          expandedIds={expandedIds}
          expandableIds={expandableIds}
          onChange={handleChange}
          onToggleExpand={handleToggleExpand}
          legend='Навыки'
          isOpen={true}
        />
      </div>
    );
  }
};

// 5. Смешанный пример с несколькими категориями
export const MultipleCategories: StoryObj = {
  render: () => {
    const [selectedIds, setSelectedIds] = useState<string[]>([
      'sub-1-1',
      'sub-2-2'
    ]);
    const [expandedIds, setExpandedIds] = useState<string[]>(['category-1']);

    const items: CheckboxItem[] = [
      { id: 'category-1', label: 'Творчество' },
      { id: 'sub-1-1', label: 'Рисование' },
      { id: 'sub-1-2', label: 'Скульптура' },
      { id: 'category-2', label: 'Технологии' },
      { id: 'sub-2-1', label: 'Программирование' },
      { id: 'sub-2-2', label: 'Дизайн' },
      { id: 'single-1', label: 'Менеджмент' },
      { id: 'single-2', label: 'Маркетинг' }
    ];

    const expandableIds = ['category-1', 'category-2'];

    const handleChange = (id: string) => {
      setSelectedIds((prev) =>
        prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
      );
    };

    const handleToggleExpand = (id: string) => {
      setExpandedIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    };

    return (
      <div style={{ maxWidth: '350px' }}>
        <Checkbox
          items={items}
          selectedIds={selectedIds}
          expandedIds={expandedIds}
          expandableIds={expandableIds}
          onChange={handleChange}
          onToggleExpand={handleToggleExpand}
          legend='Категории навыков'
          isOpen={true}
        />
      </div>
    );
  }
};
