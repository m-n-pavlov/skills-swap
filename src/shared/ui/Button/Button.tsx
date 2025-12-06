import type { ButtonProps } from './type.ts';
import { clsx } from 'clsx';
import styles from './Button.module.css';
import { Icon } from '../Icon/Icon.tsx';

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type,
  style,
  className,
  disabled = false,
  iconName,
  iconPosition = 'left',
  iconAlt
}) => {
  return (
    <>
      <button
        className={clsx(styles.button, styles[style], className)}
        onClick={onClick}
        type={type}
        disabled={disabled}
      >
        {iconName && iconPosition === 'left' && (
          <Icon name={iconName} alt={iconAlt ?? 'иконка кнопки'} />
        )}
        {children}
        {iconName && iconPosition === 'right' && (
          <Icon name={iconName} alt={iconAlt ?? 'иконка кнопки'} />
        )}
      </button>
    </>
  );
};
