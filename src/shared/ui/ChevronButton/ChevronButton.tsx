import { clsx } from 'clsx';
import { ButtonIcon } from '../ButtonIcon';
import styles from './ChevronButton.module.css';
import type { ChevronButtonProps } from './type';

export const ChevronButton = ({
  direction,
  className,
  onClick,
  name
}: ChevronButtonProps) => {
  return (
    <div className={clsx(styles.chevron, className)}>
      <ButtonIcon
        iconName='chevronRight'
        name={name ?? 'Кнопка галереи'}
        className={`${styles.chevron} ${styles[direction]}`}
        onClick={onClick}
      />
    </div>
  );
};
