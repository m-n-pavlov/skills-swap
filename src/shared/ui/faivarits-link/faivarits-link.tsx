import type { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from '../icon/Icon';
import styles from './faivarits-link.module.css';
import type { FaivaritsLinkUIProps } from './type';

export const FaivaritsLinkUI: FC<FaivaritsLinkUIProps> = ({
  href,
  className,
  iconName,
  iconAlt
}) => (
  <NavLink
    to={href || '#'}
    className={({ isActive }) =>
      `${styles.faivarits} ${isActive ? styles.faivarits_active : ''} ${className ?? ''}`
    }
  >
    <Icon
      name={iconName}
      alt={iconAlt ?? 'Добавить в избранное'}
      className={styles.icon}
    />
  </NavLink>
);
