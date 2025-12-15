import type { Meta, StoryObj } from '@storybook/react';
import { SuccessTradeModal } from '../shared/ui/SuccessTradeModal';
import { BrowserRouter } from 'react-router-dom';

const meta: Meta<typeof SuccessTradeModal> = {
  title: 'shared/SuccessTradeModal',
  component: SuccessTradeModal,
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
type Story = StoryObj<typeof SuccessTradeModal>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log('Closed'),
    iconName: 'notification'
  }
};
