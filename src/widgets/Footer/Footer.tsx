import type { FC } from 'react';
import styles from './Footer.module.css';
import { Logo } from '../../shared/ui';
import { MenuLink } from '../../shared/ui';
import clsx from 'clsx';

export const Footer: FC = () => (
  <footer className={styles.footer}>
    <div className={styles.logoSection}>
      <Logo />
      <span className={styles.projectName}>SkillSwap — 2025</span>
    </div>
    <div className={styles.linkSection}>
      <ul className={clsx(styles.linkList, styles.styledLinkList)}>
        <li>
          <MenuLink label='О проекте' href='#' />
        </li>
        <li>
          <MenuLink label='Все навыки' href='#' />
        </li>
      </ul>
      <ul className={styles.linkList}>
        <li>
          <MenuLink label='Контакты' href='#' />
        </li>
        <li>
          <MenuLink label='Блог' href='#' />
        </li>
      </ul>
      <ul className={styles.linkList}>
        <li>
          <MenuLink label='Политика конфиденциальности' href='#' />
        </li>
        <li>
          <MenuLink label='Пользовательское соглашение' href='#' />
        </li>
      </ul>
    </div>
  </footer>
);
