import type { FormEvent } from 'react';
import type { AuthFormValues } from '../../AuthForm/type';

export type RegistrFormStepOneProps = {
  values: AuthFormValues;
  onChange: (field: keyof AuthFormValues, value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  isFormValid: boolean;
  className?: string;

  emailErrorText?: string;
  passwordErrorText?: string;
  passwordStatusText?: string;
};
