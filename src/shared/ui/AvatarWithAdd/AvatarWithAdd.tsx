import { useRef, useState, type ChangeEvent } from 'react';
import clsx from 'clsx';

import { Avatar } from '../Avatar/Avatar';
import styles from './AvatarWithAdd.module.css';
import plusIcon from '../../../assets/icons/plus.svg';
import type { AvatarWithAddProps } from './type';

export const AvatarWithAdd = ({
  size,
  avatarUrl,
  onChange,
  className
}: AvatarWithAddProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [localPreview, setLocalPreview] = useState<string | null>(
    avatarUrl ?? null
  );

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;

    if (!file) {
      setLocalPreview(null);
      onChange?.(null, null);
      return;
    }

    const url = URL.createObjectURL(file);
    setLocalPreview(url);
    onChange?.(file, url);
  };

  return (
    <div className={clsx(styles.wrapper, className)}>
      <button
        type='button'
        className={styles.button}
        onClick={handleClick}
        aria-label='Загрузить аватар'
      >
        <Avatar size={size} avatarUrl={localPreview || undefined} />

        <span className={styles.badge}>
          <img
            src={plusIcon}
            alt='Добавить аватар'
            className={styles.plusIcon}
          />
        </span>
      </button>

      <input
        ref={inputRef}
        type='file'
        accept='image/*'
        className={styles.input}
        onChange={handleFileChange}
      />
    </div>
  );
};
