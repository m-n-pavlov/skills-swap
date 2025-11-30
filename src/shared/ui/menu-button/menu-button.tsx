import type { FC } from 'react';
import { Icon } from '../icon/Icon';
import styles from './menu-button.module.css';
import type { MenuButtonUIProps } from './type';

export const MenuButtonUI: FC<MenuButtonUIProps> = ({
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
        className={styles['menu_button-icon']}
      />
    </button>
  );
};
