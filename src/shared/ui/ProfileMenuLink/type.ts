import type { IconName } from '../Icon/icons';

export interface MenuItem {
  id: string;
  label: string;
  iconName: IconName;
  path: string;
  disabled?: boolean;
  count?: number;
  isActive?: boolean;
}

export interface ProfileMenuLinkProps {
  item: MenuItem;
  isActive: boolean;
  onClick: (id: string, disabled: boolean, e: React.MouseEvent) => void;
}
