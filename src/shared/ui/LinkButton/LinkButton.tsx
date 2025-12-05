import { NavLink } from 'react-router-dom';
import type { LinkButtonProps } from './type';
import React from 'react';
import { clsx } from 'clsx';
import styles from './LinkButton.module.css';

export const LinkButton: React.FC<LinkButtonProps> = ({
  children,
  to,
  style,
  className,
  size
}) => (
  <NavLink
    to={to}
    className={clsx(styles.button, styles[size], styles[style], className)}
  >
    {children}
  </NavLink>
);
