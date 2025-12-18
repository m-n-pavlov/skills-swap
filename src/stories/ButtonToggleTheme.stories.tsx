import type { Meta, StoryObj } from '@storybook/react';
import { ButtonToggleTheme } from '../shared/ui';
import '../shared/ui/ButtonToggleTheme/ButtonToggleTheme.module.css';

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

export const LightMode: Story = {
  render: () => <ButtonToggleTheme />,
  beforeEach: () => {
    localStorage.setItem('theme', 'light');
  }
};
