import type { FilterChipProps } from './type.ts';
import { memo } from 'react';
import styles from './FilterChip.module.css';
import clsx from 'clsx';
import { ButtonIcon } from '../ButtonIcon';

export const FilterChip = memo(function FilterChip({
  label,
  onRemove,
  className
}: FilterChipProps) {
  return (
    <div className={clsx(styles.chip, className)}>
      <span className={styles.text}>{label}</span>
      <button
        type='button'
        className={styles.close}
        aria-label={`Удалить фильтр ${label}`}
        onClick={onRemove}
      >
        <ButtonIcon name='cross' iconName='cross' />
      </button>
    </div>
  );
});
