import { useState, useRef } from 'react';
import type { DragEvent } from 'react';
import clsx from 'clsx';
import { Icon } from '../Icon';
import type { ChangeEvent } from 'react';
import type { InputFileProps } from './type';
import styles from './InputFile.module.css';

export const InputFile = ({ onChange, accept = 'image/*' }: InputFileProps) => {
  const [isDragActive, setIsDragActive] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = () => setIsDragActive(false);

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onChange(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  const handleClick = () => inputRef.current?.click();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onChange(e.target.files);
    }
  };

  return (
    <div
      className={clsx(styles.wrapper, { [styles.active]: isDragActive })}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <span className={styles.label}>
        Перетащите или выберите изображения навыка
      </span>
      <div className={styles.button}>
        <Icon name='galleryAdd' alt='Перетащите файл сюда' />
        Выбрать изображения
      </div>
      <input
        ref={inputRef}
        type='file'
        accept={accept}
        multiple
        className={styles.hiddenInput}
        onChange={handleChange}
      />
    </div>
  );
};
