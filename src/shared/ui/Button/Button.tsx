import type { TButtonProps } from './TButtonProps.ts';
import { clsx } from 'clsx';
import styles from './button.module.css';

export const Button: React.FC<TButtonProps> = ({
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
