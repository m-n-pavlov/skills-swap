import type { LinkButtonProps } from '../LinkButton/type';

export interface LoginButtonProps extends Omit<
  LinkButtonProps,
  'style' | 'size' | 'to'
> {
  to?: string;
  className?: string;
}
