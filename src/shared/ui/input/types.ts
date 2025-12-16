import type { IconName } from '../Icon/icons';

export interface InputProps {
  value: string;
  type: 'text' | 'email' | 'password';
  onChange: (value: string) => void;
  name: string;
  placeholder: string;
  label?: string;
  errorText?: string;
  className?: string;
  onClick?: () => void;
  infoText?: string;
  icon?: React.ReactNode;
  iconName?: IconName;
  required?: boolean;
  autofocus?: boolean;
}
