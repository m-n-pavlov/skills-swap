import type { Meta, StoryObj } from '@storybook/react';
import { StepIllustration } from '../shared/ui/StepIllustration';
import type { StepIllustrationProps } from '../shared/ui/StepIllustration/type';

const meta: Meta<typeof StepIllustration> = {
  title: 'UI/StepIllustration',
  component: StepIllustration,
  args: {
    code: 1
  } as StepIllustrationProps
};

export default meta;

type Story = StoryObj<typeof StepIllustration>;

export const Step1: Story = {
  args: {
    code: 1
  }
};

export const Step2: Story = {
  args: {
    code: 2
  }
};

export const Step3: Story = {
  args: {
    code: 3
  }
};

export const WithCustomContent: Story = {
  args: {
    code: 1,
    children: (
      <div style={{ textAlign: 'center', padding: '40px 24px' }}>
        <h2 style={{ marginBottom: 8 }}>Кастомный заголовок</h2>
        <p>Здесь можно полностью переопределить контент шага.</p>
      </div>
    )
  }
};
