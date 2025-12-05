import type { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './MenuLink.module.css';
import type { MenuLinkProps } from './type';

export const MenuLink: FC<MenuLinkProps> = ({ href, label, className }) => (
  <NavLink
    to={href || '#'}
    className={({ isActive }) =>
      `${styles.link} ${isActive ? styles.link_active : ''} ${className ?? ''}`
    }
    end
  >
    {label}
  </NavLink>
);
