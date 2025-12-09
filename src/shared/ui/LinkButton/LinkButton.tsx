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
  size,
  onClick
}) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={clsx(styles.button, styles[size], styles[style], className)}
  >
    {children}
  </NavLink>
);
