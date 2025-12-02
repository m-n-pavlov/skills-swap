import { Link } from 'react-router-dom';
import { LogoIconUI } from '../logo-icon';
import { LogoTitleUI } from '../logo-title';
import type { FC } from 'react';
import styles from './logo.module.css';

export const LogoUI: FC = () => (
  <Link to='/' className={styles.logo}>
    <LogoIconUI />
    <LogoTitleUI titleName='SkillSwap' />
  </Link>
);
