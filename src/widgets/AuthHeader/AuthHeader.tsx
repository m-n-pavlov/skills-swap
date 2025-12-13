import type { FC } from 'react';
import clsx from 'clsx';

import type { AuthHeaderProps } from './type';
import { Logo, Button, Icon } from '../../shared/ui';
import styles from './AuthHeader.module.css';

export const AuthHeader: FC<AuthHeaderProps> = ({ onClose }) => {
  return (
    <header className={clsx(styles.root)}>
      <div className={clsx(styles.logoWrap)}>
        <Logo />
      </div>

      <Button
        style='text'
        type='button'
        onClick={onClose}
        className={clsx(styles.closeButton)}
      >
        Закрыть
        <Icon
          name='cross'
          alt=''
          aria-hidden
          className={clsx(styles.closeIcon)}
        />
      </Button>
    </header>
  );
};

export default AuthHeader;
