import type { Meta, StoryObj } from '@storybook/react';
import { SuccessModal } from '../widgets/SuccessTradeModal';
import { BrowserRouter } from 'react-router-dom';

const meta: Meta<typeof SuccessModal> = {
  title: 'shared/SuccessModal',
  component: SuccessModal,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <div style={{ padding: '50px' }}>
          <Story />
        </div>
      </BrowserRouter>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof SuccessModal>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log('Closed'),
    iconName: 'notification'
  }
};
