import React from 'react';

export type LinkButtonProps = {
  children: React.ReactNode;
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
  style: 'primary' | 'secondary' | 'tertiary';
  to: string;
  className?: string;
  onClick?: () => void; // обработчик клика по кнопке "Подробнее"
};
