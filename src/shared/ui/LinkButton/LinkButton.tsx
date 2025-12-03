import { NavLink } from 'react-router-dom';
import type { LinkButtonProps } from './LinkButtonProps.ts';
import React from 'react';
import { clsx } from 'clsx';
import styles from './linkButton.module.css';

const LinkButton: React.FC<LinkButtonProps> = ({
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

export { LinkButton };
