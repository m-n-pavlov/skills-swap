import type { SearchInputProps } from './type';
import styles from './SearchInput.module.css';
import { Icon } from '../Icon';
import React, { type ChangeEvent } from 'react';

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  type = 'search',
  onChange,
  name,
  placeholder,
  onClick,
  onClear,
  showClearButton = true // Значение по умолчанию
}) => {
  const handleClear = () => {
    onClear?.();
    onChange('');
  };

  const handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    if (onClick) {
      onClick(e);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={styles.search_input_wrapper}>
      <Icon name='search' alt='Поиск' className={styles.icon} />
      <input
        type={type}
        value={value}
        onChange={handleChange}
        name={name}
        placeholder={placeholder}
        onClick={handleInputClick}
        className={`${styles.search_input} ${value ? styles['has-value'] : ''}`}
      />
      {showClearButton &&
        value && ( //кнопка очистки
          <button
            type='button'
            className='clear_button'
            onClick={handleClear}
            aria-label='Очистить поле'
          >
            <Icon name='cross' alt='Очистить' className={styles.icon} />
          </button>
        )}
    </div>
  );
};
