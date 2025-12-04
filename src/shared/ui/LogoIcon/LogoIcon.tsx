import type { FC } from 'react';
import { Icon } from '../Icon';
import styles from './LogoIcon.module.css';

export const LogoIcon: FC = () => (
  <div className={styles['Logo-icon__container']}>
    <Icon name='logo' alt='Logo' className={styles['Logo-icon__img']} />
  </div>
);
