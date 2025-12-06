import { LinkButton } from '../LinkButton';
import { memo } from 'react';
import type { LoginButtonProps } from './type';

export const LoginButton = memo(
  ({
    to = '#',
    children = 'Зарегистрироваться',
    className,
    ...rest
  }: LoginButtonProps) => {
    return (
      <form>
        <LinkButton
          size='xs'
          to={to}
          style='primary'
          className='login-button'
          {...rest}
        >
          Войти
        </LinkButton>
      </form>
    );
  }
);
