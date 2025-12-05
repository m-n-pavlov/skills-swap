import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { RegistrationButton } from '../shared/ui';

const withRouter = (Story: any) => (
  <MemoryRouter>
    <Story />
  </MemoryRouter>
);

const meta: Meta<typeof RegistrationButton> = {
  title: 'UI/Buttons/RegisterButton',
  component: RegistrationButton,
  decorators: [withRouter],
  parameters: {
    layout: 'centered',
    actions: { argTypesRegex: '^on.*' }
  }
};

export default meta;

type Story = StoryObj<typeof RegistrationButton>;

export const Default: Story = {};
