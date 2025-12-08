import { NotificationButton } from '../shared/ui/NotificationButton';
import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';

const meta: Meta<typeof NotificationButton> = {
  title: 'UI/NotificationButton',
  component: NotificationButton,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div style={{ paddingInlineStart: 500 }}>
          <Story />
        </div>
      </MemoryRouter>
    )
  ]
};
export default meta;

type Story = StoryObj<typeof NotificationButton>;

export const Primary: Story = {
  args: {}
};
export const haveNotifications: Story = {
  args: {
    isHaveNotification: true
  }
};
