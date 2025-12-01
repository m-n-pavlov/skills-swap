import { memo } from 'react';
import { Icon } from '../icon';
import styles from './Avatar.module.css';

import type { AvatarProps } from './type';

const AvatarComponent = ({
  size,
  avatarUrl,
  alt = 'User avatar',
  className
}: AvatarProps) => {
  const sizeClass = styles[size];

  return (
    <div className={`${styles.avatar} ${sizeClass} ${className ?? ''}`}>
      {avatarUrl ? (
        <img src={avatarUrl} alt={alt} className={styles.image} />
      ) : (
        <Icon name='user' alt='User icon' className={styles.icon} />
      )}
    </div>
  );
};

export const Avatar = memo(AvatarComponent);
