import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

import styles from './MenuLink.module.css';
import type { MenuLinkProps } from './type';

export const MenuLink = ({
  href,
  label,
  className,
  ...rest
}: MenuLinkProps) => (
  <NavLink
    to={href}
    className={({ isActive }) =>
      clsx(styles.link, isActive && styles.link_active, className)
    }
    end
    {...rest}
  >
    {label}
  </NavLink>
);
