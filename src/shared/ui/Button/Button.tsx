import type { ButtonProps } from './type.ts';
import { clsx } from 'clsx';
import styles from './Button.module.css';

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type,
  style,
  className,
  disabled = false
}) => {
  return (
    <>
      <button
        className={clsx(styles.button, styles[style], className)}
        onClick={onClick}
        type={type}
        disabled={disabled}
      >
        {children}
      </button>
    </>
  );
};
