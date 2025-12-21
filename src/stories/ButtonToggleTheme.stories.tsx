import type { Meta, StoryObj } from '@storybook/react';
import { ButtonToggleTheme } from '../shared/ui';
import { ThemeProvider } from '../app/providers/ThemeProvider';
import '../shared/ui/ButtonToggleTheme/ButtonToggleTheme.module.css';

const withTheme = (theme: 'light' | 'dark') => (Story: any) => {
  window.localStorage.setItem('theme', theme);
  return (
    <ThemeProvider>
      <Story />
    </ThemeProvider>
  );
};

const meta: Meta<typeof ButtonToggleTheme> = {
  title: 'UI/ToggleTheme',
  component: ButtonToggleTheme,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof ButtonToggleTheme>;

export const Default: Story = {
  render: () => <ButtonToggleTheme />,
  decorators: [withTheme('light')]
};

export const DarkMode: Story = {
  render: () => <ButtonToggleTheme />,
  decorators: [withTheme('dark')]
};

export const LightMode: Story = {
  render: () => <ButtonToggleTheme />,
  decorators: [withTheme('light')]
};
