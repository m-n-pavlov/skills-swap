import { memo } from 'react';
import clsx from 'clsx';
import type { ButtonIconProps } from './type';
import styles from './ButtonIcon.module.css';
import { Icon } from '../Icon';

export const ButtonIcon = memo(
  ({
    name,
    iconName,
    iconAlt,
    isActive = false,
    isLiked,
    className,
    onClick, // Добавляем обработчик onClick
    ...buttonProps
  }: ButtonIconProps) => {
    return (
      <button
        type='button'
        aria-label={name}
        className={clsx(styles.button, className, {
          [styles.active]: isActive,
          [styles.liked]: isLiked
        })}
        onClick={onClick} // Прокидываем onClick
        {...buttonProps}
      >
        <Icon name={iconName} alt={iconAlt ?? name} className={styles.icon} />
      </button>
    );
  }
);
