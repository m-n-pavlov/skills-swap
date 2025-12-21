import React from 'react';

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: 'small' | 'smallx2' | 'medium' | 'large';
};
