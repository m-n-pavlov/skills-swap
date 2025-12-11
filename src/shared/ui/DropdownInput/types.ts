export type DropdownOption = {
  label: string;
  value: string;
};

export type DropdownType = 'default' | 'checkbox';

export type DropdownSize = 'small' | 'medium' | 'large';

export interface DropdownInputProps {
  label: string;
  placeholder: string;
  options: DropdownOption[];
  type?: DropdownType;
  size?: DropdownSize;
  value: string | string[];
  onChange: (value: string | string[]) => void;
  onClick?: () => void;
  disabled?: boolean;
  errorText?: string;
  className?: string;
}
