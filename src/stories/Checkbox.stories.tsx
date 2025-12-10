import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Checkbox } from '../shared/ui/Checkbox';

type CheckboxProps = React.ComponentProps<typeof Checkbox>;

const meta: Meta<CheckboxProps> = {
  title: 'ui/Checkbox',
  component: Checkbox,
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Отображать или скрывать список навыков'
    },
    legend: {
      control: 'text',
      description: 'Необязательный заголовок фильтра'
    }
  }
};

export default meta;

// 1. Интерактивный список
export const Interactive: StoryObj = {
  render: () => {
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const skills = [
      'Рисование и иллюстрация',
      'Фотография',
      'Видеомонтаж',
      'Музыка и звук',
      'Актёрское мастерство',
      'Креативное письмо'
    ];

    const handleChange = (skill: string) => {
      setSelectedSkills((prev) =>
        prev.includes(skill)
          ? prev.filter((s) => s !== skill)
          : [...prev, skill]
      );
    };

    return (
      <div>
        <Checkbox
          skills={skills}
          isOpen={true}
          legend='Навыки'
          onChange={handleChange}
          selectedSkills={selectedSkills}
        />
      </div>
    );
  }
};

// 2. Без заголовка
export const WithoutLegend: StoryObj = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(['Декор и DIY']);

    const handleChange = (skill: string) => {
      setSelected((prev) =>
        prev.includes(skill)
          ? prev.filter((s) => s !== skill)
          : [...prev, skill]
      );
    };

    return (
      <Checkbox
        skills={['Декор и DIY', 'Креативное письмо', 'Фотография']}
        isOpen={true}
        onChange={handleChange}
        selectedSkills={selected}
      />
    );
  }
};

// 3. Скрытый список (что б было)
export const Closed: StoryObj<CheckboxProps> = {
  args: {
    skills: ['Тест'],
    isOpen: false,
    legend: 'Скрытый фильтр',
    selectedSkills: [],
    onChange: () => {}
  }
};

// 4. Категории с подпунктами
export const WithExpandableCategories: StoryObj = {
  render: () => {
    const [selectedSubSkills, setSelectedSubSkills] = useState<string[]>([]);
    const [expanded, setExpanded] = useState<string[]>([]);

    const category = 'Творчество и искусство';
    const subSkills = [
      'Рисование и иллюстрация',
      'Фотография',
      'Видеомонтаж',
      'Музыка и звук'
    ];

    const isCategorySelected = selectedSubSkills.length > 0;

    const handleSubSkillChange = (skill: string) => {
      setSelectedSubSkills((prev) =>
        prev.includes(skill)
          ? prev.filter((s) => s !== skill)
          : [...prev, skill]
      );
    };

    const handleExpand = (skill: string) => {
      setExpanded((prev) =>
        prev.includes(skill)
          ? prev.filter((s) => s !== skill)
          : [...prev, skill]
      );
    };

    const handleCategoryIconClick = () => {
      // При клике по иконке — выбрать/снять все подпункты
      if (selectedSubSkills.length === subSkills.length) {
        setSelectedSubSkills([]);
      } else {
        setSelectedSubSkills(subSkills);
      }
    };

    return (
      <div style={{ maxWidth: '300px' }}>
        <Checkbox
          skills={[category]}
          selectedSkills={isCategorySelected ? [category] : []}
          expandedSkills={expanded}
          expandableSkills={[category]}
          onChange={handleCategoryIconClick}
          onToggleExpand={handleExpand}
          legend='Навыки'
          isOpen={true}
        />

        {expanded.includes(category) && (
          <div style={{ marginLeft: '32px', marginTop: '8px' }}>
            <Checkbox
              skills={subSkills}
              selectedSkills={selectedSubSkills}
              onChange={handleSubSkillChange}
              isOpen={true}
            />
          </div>
        )}
      </div>
    );
  }
};
