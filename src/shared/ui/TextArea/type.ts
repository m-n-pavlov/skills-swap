export type TextAreaProps = {
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder: string;
  errorText?: string;
  infoText?: string;
  className?: string;
  required?: boolean;
  name?: string;
  maxLength?: number;
  minLength?: number;
};
