import type { LinkButtonProps } from '../LinkButton/type';

export interface RegistrationButtonProps extends Omit<
  LinkButtonProps,
  'style' | 'size'
> {
  to: string;
}
