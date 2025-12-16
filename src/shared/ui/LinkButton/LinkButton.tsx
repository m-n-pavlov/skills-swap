import { NavLink } from 'react-router-dom';
import type { LinkButtonProps } from './type';
import React from 'react';
import { clsx } from 'clsx';
import styles from './LinkButton.module.css';
import { Icon } from '../Icon';

export const LinkButton: React.FC<LinkButtonProps> = ({
  children,
  to,
  style,
  className,
  size,
  actionType = 'navigate',
  iconName,
  onClick
}) => {
  // Текст по умолчанию в зависимости от actionType
  const defaultText =
    actionType === 'navigate' ? 'Подробнее' : 'Обмен предложен';
  const content = children || defaultText;
  const showIcon = actionType === 'tradeStatus' && iconName;

  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={clsx(
        styles.button,
        styles[size],
        styles[style],
        actionType && styles[`actionType-${actionType}`],
        className
      )}
    >
      {showIcon && <Icon name={iconName} alt='' className={styles.icon} />}
      {content}
    </NavLink>
  );
};
