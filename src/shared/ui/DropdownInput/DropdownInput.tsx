import {
  useState,
  useRef,
  useEffect,
  useMemo,
  type FC,
  type ChangeEvent,
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
  size = 'medium', // 'small' | 'medium' | 'large'
  value,
  onChange,
  onClick,
  disabled,
  errorText,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const rootRef = useRef<HTMLDivElement | null>(null);

  const isCheckbox = type === 'checkbox';

  const displayValue = (() => {
    if (isCheckbox && Array.isArray(value)) {
      if (value.length === 0) return '';
      return options
        .filter((opt) => value.includes(opt.value))
        .map((opt) => opt.label)
        .join(', ');
    }

    if (!isCheckbox && typeof value === 'string') {
      const found = options.find((opt) => opt.value === value);
      return found?.label ?? '';
    }

    return '';
  })();

  useEffect(() => {
    setInputValue(displayValue);
  }, [displayValue]);

  const hasValue = isCheckbox
    ? Array.isArray(value) && value.length > 0
    : typeof value === 'string' && value !== '';

  const filteredOptions = useMemo(() => {
    const q = inputValue.trim().toLowerCase();
    if (!q) return options;

    return options.filter((opt) => opt.label.toLowerCase().includes(q));
  }, [options, inputValue]);

  const handleInputWrapperClick = () => {
    if (disabled) return;

    setIsOpen(true);
    onClick?.();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    const next = e.target.value;
    setInputValue(next);
    setIsOpen(true);

    if (!isCheckbox) {
      onChange('');
    }
  };

  const handleSelectOption = (option: DropdownOption) => {
    if (disabled) return;

    if (isCheckbox) {
      const current = Array.isArray(value) ? value : [];
      const exists = current.includes(option.value);

      const next = exists
        ? current.filter((v) => v !== option.value)
        : [...current, option.value];

      onChange(next);

      setIsOpen(true);
    } else {
      onChange(option.value);
      setInputValue(option.label);
      setIsOpen(false);
    }
  };

  const handleClear = (event: ReactMouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (disabled) return;

    setInputValue('');

    if (isCheckbox) {
      onChange([]);
      setIsOpen(true);
    } else {
      onChange('');
      setIsOpen(false);
    }
  };

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
          onClick={handleInputWrapperClick}
        >
          <input
            className={styles.input}
            placeholder={placeholder}
            value={inputValue}
            onChange={handleInputChange}
            onFocus={() => !disabled && setIsOpen(true)}
            disabled={disabled}
          />

          {/* Крестик очистки */}
          {(inputValue.length > 0 || hasValue) && !disabled && (
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
          {filteredOptions.length === 0 ? (
            <li className={clsx(styles.option, styles.optionEmpty)}>
              Ничего не найдено
            </li>
          ) : (
            filteredOptions.map((option) => {
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
            })
          )}
        </ul>
      )}

      {errorText && <p className={styles.errorText}>{errorText}</p>}
    </div>
  );
};

export default DropdownInput;
