export type RadioButtonItem = {
  label: string;
  value: string;
  checked?: boolean;
  disabled?: boolean;
};

export type RadioButtonProps = {
  legend?: string;
  name: string;
  items: RadioButtonItem[];
  onChange?: (value: string) => void;
};
