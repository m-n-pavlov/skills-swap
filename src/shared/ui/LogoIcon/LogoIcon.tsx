import type { FC } from 'react';
import { Icon } from '../Icon';
import styles from './LogoIcon.module.css';

export const LogoIcon: FC = () => (
  <div className={styles.logoIconContainer}>
    <Icon name='logo' alt='Logo' className={styles.logoIconImg} />
  </div>
);
