import type { FC } from 'react';
import { Icon } from '../icon';
import styles from './logo-icon.module.css';

export const LogoIconUI: FC = () => (
  <div className={styles['logo-icon__container']}>
    <Icon name='logo' alt='Logo' className={styles['logo-icon__img']} />
  </div>
);
