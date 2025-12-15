import type { IconName } from '../../shared/ui/Icon/icons';

export interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  iconName: IconName;
}
