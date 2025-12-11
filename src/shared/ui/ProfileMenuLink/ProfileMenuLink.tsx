import { NavLink } from 'react-router-dom';
import styles from './ProfileMenuLink.module.css';
import { Icon } from '../Icon';
import { memo } from 'react';
import type { ProfileMenuLinkProps } from './type';

export const ProfileMenuLink = memo(
  ({ item, isActive, onClick }: ProfileMenuLinkProps) => {
    return (
      <li className={styles.item}>
        <NavLink
          to={item.path}
          className={`${styles.link} ${isActive ? styles.linkActive : ''} ${item.disabled ? styles.linkDisabled : ''}`}
          onClick={(e) => onClick(item.id, item.disabled || false, e)}
          style={{ textDecoration: 'none' }}
        >
          <span className={styles.icon}>
            <Icon name={item.iconName} alt={`иконка ${item.label}`} />
          </span>
          <span className={styles.label}>{item.label}</span>
          {item.count !== undefined && (
            <span className={styles.badge}>{item.count}</span>
          )}
        </NavLink>
      </li>
    );
  }
);
