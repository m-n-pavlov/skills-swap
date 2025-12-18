import type { Meta, StoryObj } from '@storybook/react';
import { ButtonIcon } from '../shared/ui/ButtonIcon';

const meta: Meta<typeof ButtonIcon> = {
  title: 'UI/ButtonIcon',
  component: ButtonIcon,
  args: {
    onClick: () => alert('Clicked!')
  }
};

export default meta;

type Story = StoryObj<typeof ButtonIcon>;

export const Like: Story = {
  render: (args) => <ButtonIcon {...args} name='like-button' iconName='like' />
};

export const Notification: Story = {
  render: (args) => (
    <ButtonIcon {...args} name='notification-button' iconName='notification' />
  )
};
