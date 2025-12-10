import { LinkButton } from '../LinkButton';
import { memo } from 'react';
import type { LoginButtonProps } from './type';

export const LoginButton = memo(
  ({ to = '#', className, ...rest }: LoginButtonProps) => {
    return (
      <LinkButton
        size='xs'
        to={to}
        style='secondary'
        className='login-button'
        {...rest}
      >
        Войти
      </LinkButton>
    );
  }
);
