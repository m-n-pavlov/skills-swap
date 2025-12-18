import type { Meta, StoryObj } from '@storybook/react';
import { CardsGallery } from '../../src/widgets/CardsGallery';

const meta: Meta<typeof CardsGallery> = {
  title: 'widgets/CardsGallery',
  component: CardsGallery,
  argTypes: {
    users: {
      control: 'object',
      description: 'Массив пользователей для отображения в галерее',
      table: {
        type: { summary: 'TUser[]' }
      }
    }
  },
  args: {
  }
};

export default meta;
type Story = StoryObj<typeof CardsGallery>;

export const Default: Story = {
  args: {
  }
};
