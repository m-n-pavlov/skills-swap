import React, { useState } from 'react';
import styles from './Input.module.css';
import type { InputProps } from './types';
import EyeOpenIcon from '../../../../assets/icons/eye.svg';
import EyeClosedIcon from '../../../../assets/icons/eye.svg';

const Input: React.FC<InputProps> = ({
  value,
  type,
  onChange,
  name,
  placeholder,
  label,
  errorText,
  className = '',
  onClick,
  infoText,
  icon,
  autofocus,
  required
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
        {icon && <div className={styles.rightIcon}>{icon}</div>}
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
          autoFocus={autofocus}
          required={required}
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
            {showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
          </button>
        )}
      </div>

      <div className={styles.message}>
        {errorText && <span className={styles.errorText}>{errorText}</span>}
        {!errorText && infoText && (
          <span className={styles.infoText}>{infoText}</span>
        )}
      </div>
    </div>
  );
};

export default Input;
