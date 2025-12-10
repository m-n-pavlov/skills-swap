import type { Meta, StoryObj } from '@storybook/react';
import { ChevronButton } from '../shared/ui/ChevronButton';

const meta: Meta<typeof ChevronButton> = {
  title: 'UI/ChevronButton',
  component: ChevronButton,
  argTypes: {
    direction: {
      control: 'radio',
      options: ['chevronLeft', 'chevronRight'],
      description: 'Направление стрелки'
    },
    name: {
      control: 'text',
      description: 'Текст для accessibility (aria-label)'
    },
    onClick: {
      action: 'clicked',
      description: 'Обработчик клика'
    },
    className: {
      control: 'text',
      description: 'Дополнительные CSS классы'
    }
  },
  args: {
    direction: 'chevronRight',
    name: 'Навигация',
    onClick: () => console.log('ChevronButton clicked')
  }
};

export default meta;

type Story = StoryObj<typeof ChevronButton>;

export const Right: Story = {
  args: {
    direction: 'chevronRight',
    name: 'Вперед'
  }
};

export const Left: Story = {
  args: {
    direction: 'chevronLeft',
    name: 'Назад'
  }
};
