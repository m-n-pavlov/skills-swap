import type { LogoTitleProps } from './type.ts';
import type { FC } from 'react';
import styles from './logo-title.module.css';

export const LogoTitleUI: FC<LogoTitleProps> = ({ titleName, as = 'h1' }) => {
  const TagTitle = as;
  return (
    <TagTitle className={styles['logo-title__text']}>{titleName}</TagTitle>
  );
};
