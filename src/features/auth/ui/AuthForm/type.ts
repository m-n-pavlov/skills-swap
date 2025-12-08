import type { FormEvent } from 'react';

export interface AuthFormProps {
  values: {
    email: string;
    password: string;
  };
  onChange: (field: 'email' | 'password', value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  isLoading?: boolean;
  className?: string;
}
