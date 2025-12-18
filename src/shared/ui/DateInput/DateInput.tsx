import { forwardRef, memo, useEffect, useRef, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ru } from 'date-fns/locale';
import { format } from 'date-fns';
import { clsx } from 'clsx';

import { Icon } from '../Icon/Icon';
import { Button } from '../Button/Button';
import styles from './DateInput.module.css';
import type { DateInputProps } from './type';

registerLocale('ru', ru);

const DISPLAY_FORMAT = 'dd.MM.yyyy';

const parseDateInput = (value: string): Date | null => {
  const trimmed = value.trim();
  if (!trimmed) return null;

  const parts = trimmed.split(/[./]/).map((part) => part.trim());
  if (parts.length !== 3) return null;

  const [dayStr, monthStr, yearStr] = parts;
  const day = Number.parseInt(dayStr, 10);
  const month = Number.parseInt(monthStr, 10);
  const year = Number.parseInt(yearStr, 10);

  if (
    Number.isNaN(day) ||
    Number.isNaN(month) ||
    Number.isNaN(year) ||
    day < 1 ||
    day > 31 ||
    month < 1 ||
    month > 12 ||
    year < 1900 ||
    year > 2100
  ) {
    return null;
  }

  const date = new Date(year, month - 1, day);
  if (
    date.getDate() !== day ||
    date.getMonth() !== month - 1 ||
    date.getFullYear() !== year
  ) {
    return null;
  }

  return date;
};

export const DateInput = memo(
  forwardRef<HTMLInputElement, DateInputProps>(
    (
      { onChange, value = null, placeholder = 'дд.мм.гггг', disabled = false },
      ref
    ) => {
      const containerRef = useRef<HTMLDivElement>(null);
      const [isOpen, setIsOpen] = useState(false);
      const [tempDate, setTempDate] = useState<Date | null>(value);
      const [isMonthOpen, setIsMonthOpen] = useState(false);
      const [isYearOpen, setIsYearOpen] = useState(false);
      const [error, setError] = useState<string | null>(null);
      const [inputValue, setInputValue] = useState<string>(() => {
        return value ? format(value, DISPLAY_FORMAT) : '';
      });

      useEffect(() => {
        setTempDate(value);
        setInputValue(value ? format(value, DISPLAY_FORMAT) : '');
      }, [value]);

      useEffect(() => {
        if (!isOpen) {
          setIsMonthOpen(false);
          setIsYearOpen(false);
          return;
        }

        const handleClickOutside = (e: MouseEvent) => {
          if (
            containerRef.current &&
            !containerRef.current.contains(e.target as Node)
          ) {
            setIsOpen(false);
          }
        };

        document.addEventListener('click', handleClickOutside, true);
        return () =>
          document.removeEventListener('click', handleClickOutside, true);
      }, [isOpen]);

      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setInputValue(val);
        setError(null);
      };

      const handleInputBlur = () => {
        const parsed = parseDateInput(inputValue);
        if (parsed) {
          onChange(parsed);
          setError(null);
        } else if (inputValue.trim()) {
          setError('Введите корректную дату');
        } else {
          setError(null);
        }
      };

      const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
          const parsed = parseDateInput(inputValue);
          if (parsed) {
            onChange(parsed);
            setError(null);
            setIsOpen(false);
          } else if (inputValue.trim()) {
            setError('Введите корректную дату');
          }
        }
      };

      const handleToggle = () => {
        if (disabled) return;
        setTempDate(value);
        setIsOpen((prev) => !prev);
      };

      const handleCancel = () => {
        setTempDate(value);
        setIsOpen(false);
      };

      const handleConfirm = () => {
        if (tempDate) {
          onChange(tempDate);
          setInputValue(format(tempDate, DISPLAY_FORMAT));
        }
        setIsOpen(false);
      };

      const handleMonthClick = () => {
        setIsMonthOpen((prev) => !prev);
        setIsYearOpen(false);
      };

      const handleYearClick = () => {
        setIsYearOpen((prev) => !prev);
        setIsMonthOpen(false);
      };

      const handleMonthSelect = (monthIndex: number) => {
        const newDate = tempDate ? new Date(tempDate) : new Date();
        newDate.setMonth(monthIndex);
        setTempDate(newDate);
        setIsMonthOpen(false);
      };

      const handleYearSelect = (year: number) => {
        const newDate = tempDate ? new Date(tempDate) : new Date();
        newDate.setFullYear(year);
        setTempDate(newDate);
        setIsYearOpen(false);
      };

      useEffect(() => {
        if (isOpen) {
          setTimeout(() => {
            const popover = containerRef.current?.querySelector(
              `.${styles.popover}`
            );
            if (popover instanceof HTMLElement) {
              popover.focus();
            }
          }, 0);
        }
      }, [isOpen]);

      const renderCustomHeader = ({ date }: { date: Date }) => {
        const months = [
          'Январь',
          'Февраль',
          'Март',
          'Апрель',
          'Май',
          'Июнь',
          'Июль',
          'Август',
          'Сентябрь',
          'Октябрь',
          'Ноябрь',
          'Декабрь'
        ];

        const years = Array.from({ length: 100 }, (_, i) => 1950 + i);

        return (
          <div className={styles.header}>
            <div className={styles.selectWrapper}>
              <button
                type='button'
                className={styles.selectButton}
                onClick={handleMonthClick}
                disabled={disabled}
              >
                {months[date.getMonth()]}
                <Icon
                  name={isMonthOpen ? 'chevronUp' : 'chevronDown'}
                  alt={isMonthOpen ? 'Скрыть' : 'Развернуть'}
                />
              </button>
              {isMonthOpen && (
                <div className={styles.monthDropdown}>
                  {months.map((month, index) => (
                    <button
                      key={month}
                      type='button'
                      className={clsx(styles.dropdownItem, {
                        [styles.dropdownItemSelected]: index === date.getMonth()
                      })}
                      onClick={() => handleMonthSelect(index)}
                    >
                      {month}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className={styles.selectWrapper}>
              <button
                type='button'
                className={styles.selectButton}
                onClick={handleYearClick}
                disabled={disabled}
              >
                {date.getFullYear()}
                <Icon
                  name={isYearOpen ? 'chevronUp' : 'chevronDown'}
                  alt='Год'
                />
              </button>
              {isYearOpen && (
                <div className={styles.yearDropdown}>
                  {years.map((year) => (
                    <button
                      key={year}
                      type='button'
                      className={clsx(styles.dropdownItem, {
                        [styles.dropdownItemSelected]:
                          year === date.getFullYear()
                      })}
                      onClick={() => handleYearSelect(year)}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      };

      return (
        <div ref={containerRef} className={styles.container}>
          <div className={clsx(styles.field)}>
            <label className={styles.label}>Дата рождения</label>
            <div
              className={clsx(styles.inputWrapper, {
                [styles.error]: !!error
              })}
            >
              <input
                aria-label='Дата рождения'
                aria-invalid={!!error}
                ref={ref}
                type='text'
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                disabled={disabled}
                className={styles.input}
              />
              <div
                className={styles.iconWrapper}
                onClick={handleToggle}
                role='button'
                tabIndex={0}
                aria-label='Открыть календарь'
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleToggle();
                    e.preventDefault();
                  }
                }}
              >
                <Icon name='calendar' alt='' />
              </div>
            </div>
            {error && <div className={styles.errorMessage}>{error}</div>}
          </div>

          {isOpen && (
            <div
              className={styles.popover}
              role='dialog'
              aria-modal='true'
              aria-label='Выбор даты'
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleConfirm();
                  e.stopPropagation();
                }
                if (e.key === 'Escape') {
                  handleCancel();
                  e.stopPropagation();
                }
              }}
              tabIndex={-1}
            >
              <DatePicker
                inline
                locale='ru'
                selected={tempDate}
                onChange={setTempDate}
                calendarClassName={styles.calendar}
                calendarStartDay={1}
                formatWeekDay={(name: string) => {
                  const map: Record<string, string> = {
                    понедельник: 'Пн',
                    вторник: 'Вт',
                    среда: 'Ср',
                    четверг: 'Чт',
                    пятница: 'Пт',
                    суббота: 'Сб',
                    воскресенье: 'Вс'
                  };
                  return (
                    map[name.toLowerCase()] || name.slice(0, 2).toUpperCase()
                  );
                }}
                renderCustomHeader={renderCustomHeader}
                showMonthDropdown
                showYearDropdown
                dropdownMode='select'
              />
              <div className={styles.actions}>
                <Button
                  type='button'
                  style='secondary'
                  onClick={handleCancel}
                  className={styles.calendarButton}
                >
                  Отменить
                </Button>
                <Button
                  type='button'
                  style='primary'
                  onClick={handleConfirm}
                  className={styles.calendarButton}
                >
                  Выбрать
                </Button>
              </div>
            </div>
          )}
        </div>
      );
    }
  )
);

DateInput.displayName = 'DateInput';
