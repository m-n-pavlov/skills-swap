import type { Meta, StoryObj } from '@storybook/react';
import { OfferPreviewForSkillPage } from '../widgets/OfferPreviewForSkillPage';
import type { OfferPreviewForSkillPageProps } from '../widgets/OfferPreviewForSkillPage/type';

import skills from '../../public/db/skills.json';

const skill = skills.skills[4];

const mockData: OfferPreviewForSkillPageProps['data'] = {
  title: skill.shortDescription,
  category: skill.name,
  description: skill.description,
  images: skill.images
};

const meta: Meta<typeof OfferPreviewForSkillPage> = {
  title: 'Widgets/OfferPreviewForSkillPage',
  component: OfferPreviewForSkillPage
};

export default meta;

type Story = StoryObj<typeof OfferPreviewForSkillPage>;

export const Default: Story = {
  args: {
    data: mockData
  }
};
