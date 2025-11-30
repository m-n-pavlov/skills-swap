import React, { useState } from 'react';
import styles from './Input.module.css';

interface InputProps {
  value: string;
  type: 'text' | 'email' | 'password';
  onChange: (value: string) => void;
  name: string;
  placeholder: string;
  label?: string;
  errorText?: string;
  className?: string;
  onClick?: () => void;
}

const Input: React.FC<InputProps> = ({
  value,
  type,
  onChange,
  name,
  placeholder,
  label,
  errorText,
  className = '',
  onClick
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const getInputType = () => {
    if (type === 'password' && showPassword) {
      return 'text';
    }
    return type;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getInputClasses = () => {
    let classes = styles.input;

    if (errorText) {
      classes += ` ${styles.error}`;
    } else if (isFocused && value) {
      classes += ` ${styles.input}`;
    }

    if (className) {
      classes += ` ${className}`;
    }

    return classes;
  };

  return (
    <div className={styles.container}>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
      )}

      <div className={styles.inputWrapper}>
        <input
          id={name}
          name={name}
          type={getInputType()}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={getInputClasses()}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onClick={onClick}
          minLength={type === 'password' ? 8 : undefined}
          maxLength={type === 'password' ? 20 : undefined}
        />

        {type === 'password' && (
          <button
            type='button'
            className={styles.passwordToggle}
            onClick={togglePasswordVisibility}
          >
            {showPassword ? '0' : 'X'}
          </button>
        )}
      </div>

      <div className={styles.message}>
        {errorText && <span className={styles.errorText}>{errorText}</span>}
      </div>
    </div>
  );
};

export default Input;
