import { ButtonIcon } from '../ButtonIcon';
import { type FC } from 'react';
import styles from './ButtonToggleTheme.module.css';
import { clsx } from 'clsx';
import { useTheme } from '../../../app/providers/ThemeProvider.tsx';

export const ButtonToggleTheme: FC<{ className?: string }> = ({
  className
}) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <ButtonIcon
      onClick={toggleTheme}
      name={'ButtonToggleTheme'}
      iconName={theme === 'dark' ? 'moon' : 'sun'}
      className={clsx(styles.theme, className)}
    />
  );
};
