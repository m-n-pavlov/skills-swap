import type { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from '../icon/Icon';
import styles from './favorite-link.module.css';
import type { FavoriteLinkUIProps } from './type';

export const FavoriteLinkUI: FC<FavoriteLinkUIProps> = ({
  href,
  className,
  iconName,
  iconAlt
}) => (
  <NavLink
    to={href || '#'}
    className={({ isActive }) =>
      `${styles.favorite} ${isActive ? styles.favorite_active : ''} ${className ?? ''}`
    }
    end
  >
    <Icon
      name={iconName}
      alt={iconAlt ?? 'Добавить в избранное'}
      className={styles.icon}
    />
  </NavLink>
);
