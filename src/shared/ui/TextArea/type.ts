import type { IconName } from '../Icon/icons';

export type TextAreaProps = {
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder: string;
  errorText?: string;
  infoText?: string;
  className?: string;
  iconName?: IconName;
  required?: boolean;
  name?: string;
  maxLength?: number;
  minLength?: number;
};
