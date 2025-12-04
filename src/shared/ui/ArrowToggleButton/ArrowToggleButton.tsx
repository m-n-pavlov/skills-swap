import clsx from 'clsx';
import styles from './ArrowToggleButton.module.css';
import type { ArrowToggleButtonProps } from './type.ts';
import { Icon } from '../Icon';

export const ArrowToggleButton = ({
  label,
  onClick,
  isOpen,
  className,
  labelStyle,
  iconGap
}: ArrowToggleButtonProps) => {
  return (
    <button
      type='button'
      className={clsx(styles.button, className)}
      onClick={onClick}
      style={{ gap: iconGap ?? undefined }}
    >
      <span className={styles.label} style={labelStyle}>
        {label}
      </span>

      <Icon
        name={isOpen ? 'chevronUp' : 'chevronDown'}
        alt={isOpen ? 'Скрыть' : 'Показать'}
        className={styles.icon}
      />
    </button>
  );
};
