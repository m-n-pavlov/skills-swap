export type DateInputProps = {
  onChange: (date: Date | null) => void;
  value?: Date | null;
  placeholder?: string;
  disabled?: boolean;
};
