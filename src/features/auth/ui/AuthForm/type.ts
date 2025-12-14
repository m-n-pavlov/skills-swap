import type { FormEvent } from 'react';

export type AuthFormValues = {
  email: string;
  password: string;
};

export type AuthFormProps = {
  values: AuthFormValues;
  onChange: (field: keyof AuthFormValues, value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  isSubmitDisabled?: boolean;
  className?: string;

  submitText?: string;
  showRegisterLink?: boolean;
  passwordPlaceholder?: string;
  passwordHint?: string;

  emailErrorText?: string;
  passwordErrorText?: string;
  passwordStatusText?: string;
  globalErrorText?: string;
};
