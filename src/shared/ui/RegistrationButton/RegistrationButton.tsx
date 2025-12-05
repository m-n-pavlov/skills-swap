import React from 'react';
import { LinkButton } from '../LinkButton';
import type { RegistrationButtonProps } from './type';

export const RegistrationButton: React.FC<RegistrationButtonProps> = ({
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
      Зарегистрироваться
    </LinkButton>
  );
};
