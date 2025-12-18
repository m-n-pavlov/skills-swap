import type { IconName } from '../Icon/icons';

export type SuccessModalProps = {
  isOpen: boolean;
  onClose: () => void;
  iconName: IconName;
};
