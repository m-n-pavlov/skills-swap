import { Link } from 'react-router-dom';
import { LogoIcon } from '../LogoIcon';
import { LogoTitle } from '../LogoTitle';
import type { FC } from 'react';
import styles from './Logo.module.css';

export const Logo: FC = () => (
  <Link to='/' className={styles.logo}>
    <LogoIcon />
    <LogoTitle titleName='SkillSwap' />
  </Link>
);
