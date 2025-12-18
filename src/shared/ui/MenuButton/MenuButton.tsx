import { memo } from 'react';
import clsx from 'clsx';

import { Icon } from '../Icon';
import styles from './MenuButton.module.css';
import type { MenuButtonProps } from './type';

export const MenuButton = memo(
  ({
    label,
    iconName,
    iconAlt,
    isActive = false,
    hideLabel = false,
    iconPosition = 'right',
    className,
    children,
    ...buttonProps
  }: MenuButtonProps) => {
    const computedAlt = iconAlt ?? `Icon for ${label}`;

    const ariaLabel = hideLabel ? label : buttonProps['aria-label'];

    const content = children ?? (
      <>
        {iconPosition === 'left' && (
          <Icon
            name={iconName}
            alt={computedAlt}
            className={styles['menu_button-icon']}
          />
        )}

        {!hideLabel && (
          <span className={styles['menu_button-label']}>{label}</span>
        )}

        {iconPosition === 'right' && (
          <Icon
            name={iconName}
            alt={computedAlt}
            className={styles['menu_button-icon']}
          />
        )}
      </>
    );

    return (
      <button
        type='button'
        className={clsx(
          styles.menu_button,
          isActive && styles['menu_button-active'],
          className
        )}
        aria-pressed={isActive}
        aria-label={ariaLabel}
        {...buttonProps}
      >
        {content}
      </button>
    );
  }
);
