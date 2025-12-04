import type { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Avatar } from '../avatar';
import styles from './user-link.module.css';
import type { UserLinkUIProps } from './type';

export const UserLinkUI: FC<UserLinkUIProps> = ({
  href,
  className,
  size,
  alt,
  name,
  avatarUrl,
  ...navLinkProps
}) => (
  <NavLink
    to={href || '#'}
    className={`${styles.user} ${className ?? ''}`}
    end
    {...navLinkProps}
  >
    <span className={styles.user_name}>{name || 'Гость'}</span>
    <Avatar
      size={size}
      avatarUrl={avatarUrl}
      alt={alt ?? 'User avatar'}
      className={styles.user_avatar}
    />
  </NavLink>
);
