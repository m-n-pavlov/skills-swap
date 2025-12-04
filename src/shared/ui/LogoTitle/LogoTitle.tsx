import type { LogoTitleProps } from './type.ts';
import type { FC } from 'react';
import styles from './LogoTitle.module.css';

export const LogoTitle: FC<LogoTitleProps> = ({ titleName, as = 'h1' }) => {
  const TagTitle = as;
  return (
    <TagTitle className={styles['Logo-title__text']}>{titleName}</TagTitle>
  );
};
