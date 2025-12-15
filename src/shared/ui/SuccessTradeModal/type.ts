import type { IconName } from '../Icon/icons';

export interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  iconName: IconName;
}
