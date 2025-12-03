import { memo } from 'react';
import clsx from 'clsx';
import type { ButtonIconProps } from './type';
import styles from './ButtonIcon.module.css';

export const ButtonIcon = memo(
  ({ onClick, children, name, className }: ButtonIconProps) => {
    return (
      <button
        type='button'
        aria-label={name}
        onClick={onClick}
        className={clsx(styles.button, className)}
      >
        {children}
      </button>
    );
  }
);
