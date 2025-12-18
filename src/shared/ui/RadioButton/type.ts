export type RadioButtonItem<T extends string = string> = {
  label: string;
  value: T;
  checked?: boolean;
  disabled?: boolean;
};

export type RadioButtonProps<T extends string = string> = {
  legend?: string;
  name: string;
  items: RadioButtonItem<T>[];
  onChange?: (value: T) => void;
};
