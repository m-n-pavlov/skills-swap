import React from 'react';
import LinkButton from '../LinkButton/LinkButton';
import type { RegisterButtonProps } from './type';

export const RegisterButton: React.FC<RegisterButtonProps> = ({
  to = '#', // заглушка
  children = 'Зарегистрироваться',
  className,
  ...rest
}) => {
  return (
    <LinkButton
      to={to}
      style='primary'
      size='lg'
      className={className}
      {...rest}
    >
      {children}
    </LinkButton>
  );
};
