import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from '../shared/ui/Modal';
import type { ModalProps } from '../shared/ui/Modal';

const meta: Meta<typeof Modal> = {
  title: 'UI/Modal',
  component: Modal,
  args: {
    isOpen: true,
    onClose: () => {},
    children: (
      <div style={{ padding: '24px' }}>
        <h2 style={{ marginBottom: '8px' }}>Заголовок модалки</h2>
        <p>
          Это содержимое модального окна. Здесь может быть текст, форма или
          любой другой компонент.
        </p>
      </div>
    ),
    size: 'medium'
  },
  decorators: [
    (Story) => (
      <div
        style={{
          minHeight: '100vh',
          backgroundColor: '#f9faf7'
        }}
      >
        <Story />
      </div>
    )
  ]
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const Small: Story = {
  args: {
    size: 'small'
  } as ModalProps
};

export const Medium: Story = {
  args: {
    size: 'medium'
  } as ModalProps
};

export const Large: Story = {
  args: {
    size: 'large'
  } as ModalProps
};

export const Closed: Story = {
  args: {
    isOpen: false
  } as ModalProps
};
