import { memo } from 'react';
import clsx from 'clsx';
import type { TagProps } from './type';
import styles from './Tag.module.css';

export const Tag = memo(function Tag({
  children,
  category,
  className
}: TagProps) {
  return (
    <span
      className={clsx(styles.tag, styles[category ?? 'default'], className)}
    >
      {children}
    </span>
  );
});
