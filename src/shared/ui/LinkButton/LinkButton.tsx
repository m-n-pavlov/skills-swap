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
  actionType,
  iconName,
  onClick,
  disabled
}) => {
  const defaultText =
    actionType === 'navigate' ? 'Подробнее' : 'Обмен предложен';
  const content = children || defaultText;
  const showIcon = actionType === 'tradeStatus' && iconName;

  if (disabled || actionType === 'tradeStatus') {
    return (
      <button
        type='button'
        disabled
        className={clsx(
          styles.button,
          styles[size],
          styles['tertiary'],
          styles.disabled,
          styles[`actionType-${actionType}`],
          className
        )}
      >
        {showIcon && <Icon name={iconName} alt='' className={styles.icon} />}
        {content}
      </button>
    );
  }

  return (
    <NavLink
      to={to === '#' && actionType === 'navigate' ? undefined! : to}
      onClick={(e) => {
        if (actionType === 'navigate' && to === '#') {
          e.preventDefault();
          onClick?.();
          return;
        }
      }}
      className={clsx(
        styles.button,
        styles[size],
        styles[style],
        actionType && styles[`actionType-${actionType}`],
        className
      )}
    >
      {content}
    </NavLink>
  );
};
