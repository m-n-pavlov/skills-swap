import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../shared/ui/Button';

// Базовая конфигурация сторибука
const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  args: {
    onClick: () => alert('Button clicked!'),
    type: 'button'
  }
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    style: 'primary'
  }
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    style: 'secondary'
  }
};

export const Tertiary: Story = {
  args: {
    children: 'Tertiary Button',
    style: 'tertiary'
  }
};

export const DisabledPrimary: Story = {
  args: {
    children: 'Disabled Button',
    style: 'primary',
    disabled: true
  }
};

export const DisabledSecondary: Story = {
  args: {
    children: 'Disabled Button',
    style: 'secondary',
    disabled: true
  }
};

export const DisabledTertiary: Story = {
  args: {
    children: 'Disabled Button',
    style: 'tertiary',
    disabled: true
  }
};
