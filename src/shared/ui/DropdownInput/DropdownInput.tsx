import {
  useState,
  useRef,
  useEffect,
  type FC,
  type MouseEvent as ReactMouseEvent
} from 'react';
import clsx from 'clsx';

import styles from './DropdownInput.module.css';
import type { DropdownInputProps, DropdownOption } from './types';
import { Icon } from '../Icon/Icon';

export const DropdownInput: FC<DropdownInputProps> = ({
  label,
  placeholder,
  options,
  type = 'default', // 'default' | 'checkbox'
  size = 'medium', // 'small' | 'medium' | 'large' — как в типах
  value,
  onChange,
  onClick,
  disabled,
  errorText,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const isCheckbox = type === 'checkbox';

  // --- красивое значение, которое показываем в инпуте ---
  const displayValue = (() => {
    // режим с чекбоксами (множественный выбор)
    if (isCheckbox && Array.isArray(value)) {
      if (value.length === 0) return '';
      return options
        .filter((opt) => value.includes(opt.value))
        .map((opt) => opt.label)
        .join(', ');
    }

    // обычный селект: value = string
    if (!isCheckbox && typeof value === 'string') {
      const found = options.find((opt) => opt.value === value);
      return found?.label ?? '';
    }

    return '';
  })();

  const hasValue = Boolean(displayValue);

  // --- клик по "инпуту" ---
  const handleInputClick = () => {
    if (disabled) return;

    setIsOpen((prev) => !prev);
    onClick?.(); // onClick опционален
  };

  // --- выбор элемента ---
  const handleSelectOption = (option: DropdownOption) => {
    if (disabled) return;

    if (isCheckbox) {
      const current = Array.isArray(value) ? value : [];
      const exists = current.includes(option.value);

      const next = exists
        ? current.filter((v) => v !== option.value)
        : [...current, option.value];

      onChange(next);
    } else {
      onChange(option.value);
      setIsOpen(false);
    }
  };

  // --- очистка поля (крестик) ---
  const handleClear = (event: ReactMouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // чтобы не триггерить открытие/закрытие списка
    if (disabled) return;

    if (isCheckbox) {
      onChange([]);
    } else {
      onChange('');
    }
  };

  // --- клик вне дропдауна -> закрываем ---
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!rootRef.current) return;
      if (!(event.target instanceof Node)) return;

      if (!rootRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const arrowIcon = isOpen ? 'chevronUp' : 'chevronDown';

  return (
    <div
      ref={rootRef}
      className={clsx(styles.root, styles[size], className, {
        [styles.disabled]: disabled,
        [styles.error]: Boolean(errorText)
      })}
    >
      <label className={styles.label}>
        <span className={styles.labelText}>{label}</span>

        <div
          className={clsx(styles.inputWrapper, {
            [styles.inputWrapperOpen]: isOpen
          })}
          onClick={handleInputClick}
        >
          <input
            className={styles.input}
            placeholder={placeholder}
            value={displayValue}
            readOnly
            disabled={disabled}
          />

          {/* Крестик очистки */}
          {hasValue && !disabled && (
            <button
              type='button'
              className={styles.clearButton}
              onClick={handleClear}
              aria-label='Очистить'
            >
              <Icon name='cross' alt='Очистить поле' />
            </button>
          )}

          {/* Стрелка */}
          <button
            type='button'
            className={styles.arrowButton}
            onClick={(e) => {
              e.stopPropagation();
              if (!disabled) {
                setIsOpen((prev) => !prev);
              }
            }}
            aria-label={isOpen ? 'Свернуть список' : 'Развернуть список'}
          >
            <Icon name={arrowIcon} alt='' />
          </button>
        </div>
      </label>

      {/* Выпадающий список */}
      {isOpen && (
        <ul className={styles.dropdown}>
          {options.map((option) => {
            const checked =
              isCheckbox && Array.isArray(value)
                ? value.includes(option.value)
                : false;

            return (
              <li
                key={option.value}
                className={clsx(styles.option, {
                  [styles.optionChecked]: checked
                })}
                onClick={() => handleSelectOption(option)}
              >
                {isCheckbox && (
                  <span className={styles.checkbox}>
                    <Icon
                      name={checked ? 'checkboxDone' : 'checkboxEmpty'}
                      alt={checked ? 'Выбрано' : 'Не выбрано'}
                    />
                  </span>
                )}
                <span className={styles.optionLabel}>{option.label}</span>
              </li>
            );
          })}
        </ul>
      )}

      {errorText && <p className={styles.errorText}>{errorText}</p>}
    </div>
  );
};

export default DropdownInput;
