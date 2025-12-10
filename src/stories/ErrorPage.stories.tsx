import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { ErrorPage } from '../shared/ui/ErrorPage';

const meta: Meta<typeof ErrorPage> = {
  title: 'UI/ErrorPage',
  component: ErrorPage,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    )
  ]
};

export default meta;

type Story = StoryObj<typeof ErrorPage>;

export const Error404: Story = {
  args: {
    code: 404
  }
};

export const Error500: Story = {
  args: {
    code: 500
  }
};
