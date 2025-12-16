import React from 'react';
import type { IconName } from '../Icon/icons.ts';

export type LinkButtonProps = {
  children?: React.ReactNode;
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
  style: 'primary' | 'secondary' | 'tertiary';
  to: string;
  actionType?: 'navigate' | 'tradeStatus'; // новый проп для двух вариантов кнопки
  iconName?: IconName; // новый проп для имени иконки (для tradeStatus)
  className?: string;
  onClick?: () => void; // обработчик клика по кнопке "Подробнее"
};
