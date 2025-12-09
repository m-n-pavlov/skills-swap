import type { Meta, StoryObj } from '@storybook/react';
import { PhotoGallery } from '../shared/ui/PhotoGallery';

import skills from '../../public/db/skills.json';

const testImages = skills.skills[3].images;

const meta: Meta<typeof PhotoGallery> = {
  title: 'Gallery/PhotoGallery',
  component: PhotoGallery,
  argTypes: {
    images: {
      control: 'object',
      description: 'Массив изображений',
      table: {
        type: { summary: 'string[]' }
      }
    }
  },
  args: {
    images: testImages
  }
};

export default meta;
type Story = StoryObj<typeof PhotoGallery>;

export const Default: Story = {
  args: {
    images: testImages
  }
};
