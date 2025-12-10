import { memo, useState } from 'react';
import clsx from 'clsx';
import styles from './Textarea.module.css';
import type { TextAreaProps } from './type';

export const TextArea = memo(
  ({
    value,
    onChange,
    label,
    placeholder,
    errorText,
    className = '',
    required = false,
    name,
    maxLength = 500,
    minLength = 10
  }: TextAreaProps) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e.target.value);
    };

    const errorId = `${name}-error`;

    const textareaClasses = clsx(
      styles.textarea,
      {
        [styles.error]: Boolean(errorText),
        [styles.focus]: isFocused && value && !errorText
      },
      className
    );

    return (
      <div className={styles.container}>
        {label && (
          <label htmlFor={name} className={styles.label}>
            {label}
          </label>
        )}

        <textarea
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={textareaClasses}
          maxLength={maxLength}
          minLength={minLength}
          required={required}
          aria-required={required}
          aria-invalid={Boolean(errorText)}
          aria-describedby={errorText ? errorId : undefined}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        <div className={styles.message}>
          {errorText && (
            <span id={errorId} className={styles.errorText}>
              {errorText}
            </span>
          )}
        </div>
      </div>
    );
  }
);
