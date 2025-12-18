import type { Meta, StoryObj } from '@storybook/react';
import { MenuButton } from '../shared/ui/MenuButton';
import type { MenuButtonProps } from '../shared/ui/MenuButton/type';

const meta: Meta<typeof MenuButton> = {
  title: 'UI/MenuButton',
  component: MenuButton,
  args: {
    label: 'Все навыки',
    iconPosition: 'right',
    hideLabel: false,
    isActive: false
  } as MenuButtonProps
};

export default meta;

type Story = StoryObj<typeof MenuButton>;

export const ChevronDown: Story = {
  args: {
    iconName: 'chevronDown'
  }
};

export const ChevronRight: Story = {
  args: {
    label: 'Смотреть все',
    iconName: 'chevronRight'
  }
};

export const ChevronUp: Story = {
  args: {
    iconName: 'chevronUp'
  }
};

export const ActiveChevronDown: Story = {
  args: {
    iconName: 'chevronDown',
    isActive: true
  }
};

export const IconOnly: Story = {
  args: {
    hideLabel: true,
    iconName: 'chevronDown',
    'aria-label': 'Открыть список навыков'
  }
};
