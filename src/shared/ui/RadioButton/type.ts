// Элемент радиокнопки с generic-типом
export type RadioButtonItem<T extends string = string> = {
  label: string;
  value: T;
  checked?: boolean;
  disabled?: boolean;
};

// Пропсы радиокнопок с generic-типом
export type RadioButtonProps<T extends string = string> = {
  legend?: string;
  name: string;
  items: RadioButtonItem<T>[];
  onChange?: (value: T) => void;
};
