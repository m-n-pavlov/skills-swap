import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { UserMenu } from '../widgets/UserMenu/UserMenu';

const meta: Meta<typeof UserMenu> = {
  title: 'Components/UserMenu',
  component: UserMenu,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div style={{ padding: '20px', maxWidth: '280px' }}>
          <Story />
        </div>
      </MemoryRouter>
    )
  ]
};

export default meta;

type Story = StoryObj<typeof UserMenu>;

export const Default: Story = {
  args: {}
};

export const WithActiveSkills: Story = {
  args: {},
  parameters: {
    reactRouter: {
      routePath: '#'
    }
  }
};

export const WithActivePersonal: Story = {
  args: {},
  parameters: {
    reactRouter: {
      routePath: '#'
    }
  }
};
