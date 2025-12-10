import type { Meta, StoryObj } from '@storybook/react';
import { StepProgress } from '../shared/ui/StepProgrees';

const meta: Meta<typeof StepProgress> = {
  title: 'UI/StepProgress',
  component: StepProgress,
  args: {
    currentStep: 1,
    totalSteps: 3
  }
};

export default meta;

type Story = StoryObj<typeof StepProgress>;

export const Step1: Story = {
  args: {
    currentStep: 1
  }
};

export const Step2: Story = {
  args: {
    currentStep: 2
  }
};

export const Step3: Story = {
  args: {
    currentStep: 3
  }
};
