import type { Meta, StoryObj } from '@storybook/react';
import { ToggleTheme } from '../shared/ui/toggle-theme';
import '../shared/ui/toggle-theme/toggle-theme.module.css';

const meta: Meta<typeof ToggleTheme> = {
  title: 'Components/ToggleTheme',
  component: ToggleTheme,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof ToggleTheme>;

export const Default: Story = {
  render: () => <ToggleTheme />
};

export const DarkMode: Story = {
  render: () => <ToggleTheme />,
  beforeEach: () => {
    localStorage.setItem('theme', 'dark');
  }
};

// История со светлой темой по умолчанию
export const LightMode: Story = {
  render: () => <ToggleTheme />,
  beforeEach: () => {
    localStorage.setItem('theme', 'light');
  }
};
