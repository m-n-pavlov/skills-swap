import { ButtonIcon } from '../ButtonIcon';
import { Icon } from '../Icon';
import { type FC, useEffect, useState } from 'react';
import styles from './ButtonToggleTheme.module.css';
import type { ButtonToggleThemeProps } from './type.ts';
import { clsx } from 'clsx';

export const ButtonToggleTheme: FC<ButtonToggleThemeProps> = ({
  className
}) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });
  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const changeTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  return (
    <ButtonIcon
      onClick={changeTheme}
      name={'ButtonToggleTheme'}
      className={clsx(styles.theme, className)}
    >
      {isDarkMode ? (
        <Icon name={'moon'} alt='moon' />
      ) : (
        <Icon name={'sun'} alt='sun' />
      )}
    </ButtonIcon>
  );
};
