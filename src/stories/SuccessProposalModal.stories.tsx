import type { Meta, StoryObj } from '@storybook/react';
import { SuccessProposalModal } from '../widgets/SuccessProposalModal/SuccessProposalModal';

const meta = {
  title: 'Widgets/SuccessProposalModal',
  component: SuccessProposalModal,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Определяет, открыто ли модальное окно'
    },
    onClose: {
      description: 'Функция, вызываемая при закрытии модалки'
    }
  }
} satisfies Meta<typeof SuccessProposalModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Open: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log('Modal closed')
  }
};
