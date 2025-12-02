import type { Meta, StoryObj } from '@storybook/react';
import { ButtonIcon } from '../shared/ui/ButtonIcon';
import { Icon } from '../shared/ui/icon';

const meta: Meta<typeof ButtonIcon> = {
  title: 'Shared/ButtonIcon',
  component: ButtonIcon,
  args: {
    onClick: () => alert('Clicked!')
  }
};

export default meta;

type Story = StoryObj<typeof ButtonIcon>;

export const Like: Story = {
  render: (args) => (
    <ButtonIcon {...args} name='like-button'>
      <Icon name='like' alt='Like icon' />
    </ButtonIcon>
  )
};

export const Notification: Story = {
  render: (args) => (
    <ButtonIcon {...args} name='notification-button'>
      <Icon name='notification' alt='Notification icon' />
    </ButtonIcon>
  )
};
