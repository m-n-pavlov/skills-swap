import { ButtonIcon } from '../ButtonIcon';
import { Icon } from '../icon';
import { type FC, useEffect, useState } from 'react';
import styles from './toggle-theme.module.css';
import type { TToggleTheme } from './type.ts';
import { clsx } from 'clsx';

const ToggleTheme: FC<TToggleTheme> = ({ className }) => {
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
      name={'toggle-theme'}
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

export { ToggleTheme };
