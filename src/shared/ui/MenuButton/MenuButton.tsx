import type { FC } from 'react';
import { Icon } from '../Icon';
import styles from './MenuButton.module.css';
import type { MenuButtonProps } from './type';

export const MenuButton: FC<MenuButtonProps> = ({
  label,
  iconName,
  iconAlt,
  isActive = false,
  className,
  ...buttonProps
}) => {
  return (
    <button
      type='button'
      className={`
        ${styles.menu_button}
        ${isActive ? styles['menu_button-active'] : ''}
        ${className ?? ''}
      `}
      {...buttonProps}
    >
      <span className={styles['menu_button-label']}>{label}</span>
      <Icon
        name={iconName}
        alt={iconAlt ?? label}
        className={styles['menu_button-Icon']}
      />
    </button>
  );
};
