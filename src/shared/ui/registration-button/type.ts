import type { LinkButtonProps } from '../LinkButton/LinkButtonProps';

export interface RegisterButtonProps extends Omit<
  LinkButtonProps,
  'style' | 'size'
> {
  to: string;
}
