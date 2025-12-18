import type { Meta, StoryObj } from '@storybook/react';
import { FilterChip } from '../shared/ui';

const meta: Meta<typeof FilterChip> = {
  title: 'UI/FilterChip',
  component: FilterChip,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    onRemove: { action: 'removed' },
    className: { control: 'text' }
  }
};

export default meta;

type Story = StoryObj<typeof FilterChip>;

export const WithRemoveAction: Story = {
  args: {
    label: 'Английский',
    onRemove: () => console.log('Чип удалён')
  }
};
