import type { Meta, StoryObj } from '@storybook/react';
import { OfferPreviewModal } from '../widgets/OfferPreviewModal/OfferPreviewModal';
import skills from '../../public/db/skills.json';

const skill = skills.skills[3];

const mockData = {
  title: skill.shortDescription,
  category: skill.name,
  description: skill.description,
  images: skill.images
};

const meta: Meta<typeof OfferPreviewModal> = {
  title: 'Widgets/OfferPreviewModal',
  component: OfferPreviewModal
};

export default meta;

type Story = StoryObj<typeof OfferPreviewModal>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    data: mockData
  }
};
