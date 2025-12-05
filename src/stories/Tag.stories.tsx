import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from '../shared/ui';
import type { TagProps } from '../shared/ui/Tag/type.ts';

const meta: Meta<TagProps> = {
  title: 'Components/Tag',
  component: Tag,
  tags: ['autodocs'],
  args: {
    category: 'default',
    children: 'Tag'
  }
};

export default meta;
type Story = StoryObj<TagProps>;

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Tag category='language'>Английский язык</Tag>
      <Tag category='education'>Тайм менеджмент</Tag>
      <Tag category='health'>Медитация</Tag>
      <Tag category='business'>Бизнес-план</Tag>
      <Tag category='art'>Игра на барабанах</Tag>
      <Tag category='home'>Реставрация мебели</Tag>
      <Tag category='default'>+2</Tag>
    </div>
  )
};

export const EnglishLanguage: Story = {
  args: {
    children: 'Английский язык',
    category: 'language'
  }
};

export const TimeManagement: Story = {
  args: {
    children: 'Тайм менеджмент',
    category: 'education'
  }
};

export const Meditation: Story = {
  args: {
    children: 'Медитация',
    category: 'health'
  }
};

export const BusinessPlan: Story = {
  args: {
    children: 'Бизнес-план',
    category: 'business'
  }
};

export const Drums: Story = {
  args: {
    children: 'Игра на барабанах',
    category: 'art'
  }
};

export const FurnitureRestoration: Story = {
  args: {
    children: 'Реставрация мебели',
    category: 'home'
  }
};

export const Default: Story = {
  args: {
    children: '+2',
    category: 'default'
  }
};
