import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

import { Icon } from '../Icon';
import styles from './FaivaritsLink.module.css';
import type { FaivaritsLinkUIProps } from './type';

export const FaivaritsLinkUI = ({
  href,
  className,
  iconName,
  iconAlt = 'Добавить в избранное'
}: FaivaritsLinkUIProps) => {
  return (
    <NavLink
      to={href || '#'}
      aria-label={iconAlt}
      className={({ isActive }) =>
        clsx(styles.faivarits, isActive && styles.faivarits_active, className)
      }
    >
      <Icon name={iconName} alt={iconAlt} className={styles.icon} />
    </NavLink>
  );
};
