export interface RadioButtonItem {
  label: string;
  value: string;
  checked?: boolean;
  disabled?: boolean;
}

export interface RadioButtonProps {
  legend?: string;
  name: string;
  items: RadioButtonItem[];
  onChange?: (value: string) => void;
}
