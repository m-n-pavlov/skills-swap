import type { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './menu-link.module.css';
import type { MenuLinkUIProps } from './type';

export const MenuLinkUI: FC<MenuLinkUIProps> = ({ href, label, className }) => (
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
