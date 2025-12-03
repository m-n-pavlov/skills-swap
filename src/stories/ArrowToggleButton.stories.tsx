import type { Meta, StoryObj } from '@storybook/react';
import { ArrowToggleButton } from '../shared/ui/ArrowToggleButton';

const meta: Meta<typeof ArrowToggleButton> = {
  title: 'Shared/ArrowToggleButton',
  component: ArrowToggleButton,
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
    iconGap: { control: 'number' },
    labelStyle: { control: 'object' },
    isOpen: { control: 'boolean' },
    label: { control: 'text' }
  }
};

export default meta;

type Story = StoryObj<typeof ArrowToggleButton>;

export const Closed: Story = {
  args: {
    label: 'Показать детали',
    isOpen: false
  }
};

export const Open: Story = {
  args: {
    label: 'Скрыть детали',
    isOpen: true
  }
};

export const CustomGap: Story = {
  args: {
    label: 'Показать детали',
    isOpen: false,
    iconGap: 12
  }
};

export const CustomLabelStyle: Story = {
  args: {
    label: 'Показать детали',
    isOpen: false,
    labelStyle: { color: 'var(--text-link)' }
  }
};
