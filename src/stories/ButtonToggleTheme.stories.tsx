import type { Meta, StoryObj } from '@storybook/react';
import { ButtonToggleTheme } from '../shared/ui/button-toggle-theme';
import '../shared/ui/button-toggle-theme/button-toggle-theme.module.css';

const meta: Meta<typeof ButtonToggleTheme> = {
  title: 'Components/ToggleTheme',
  component: ButtonToggleTheme,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof ButtonToggleTheme>;

export const Default: Story = {
  render: () => <ButtonToggleTheme />
};

export const DarkMode: Story = {
  render: () => <ButtonToggleTheme />,
  beforeEach: () => {
    localStorage.setItem('theme', 'dark');
  }
};

// История со светлой темой по умолчанию
export const LightMode: Story = {
  render: () => <ButtonToggleTheme />,
  beforeEach: () => {
    localStorage.setItem('theme', 'light');
  }
};
