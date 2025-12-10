import type { FormEvent } from 'react';
import type { AuthFormProps } from './type';
import styles from './AuthForm.module.css';

import { Input } from '../../../../shared/ui/Input';
import { Button } from '../../../../shared/ui/Button/Button';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

import googleIcon from '../../../../assets/icons/google.svg';
import appleIcon from '../../../../assets/icons/apple.svg';

export const AuthForm = ({
  values,
  onChange,
  onSubmit,
  isLoading,
  className,
  submitText = 'Вход',
  showRegisterLink = true,
  passwordPlaceholder = 'Введите ваш пароль',
  passwordHint,
  emailErrorText,
  passwordErrorText,
  passwordStatusText,
  globalErrorText
}: AuthFormProps) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(event);
  };

  const hasGlobalError = Boolean(globalErrorText);

  return (
    <form
      className={clsx(styles.form_content, className)}
      onSubmit={handleSubmit}
    >
      {/* Соц-кнопки */}
      <Button
        type='button'
        style='secondary'
        onClick={() => {}}
        className={styles.socialButton}
      >
        <img src={googleIcon} alt='Google' className={styles.socialIcon} />
        <span className={styles.text}>Продолжить с Google</span>
      </Button>

      <Button
        type='button'
        style='secondary'
        onClick={() => {}}
        className={styles.socialButton}
      >
        <img src={appleIcon} alt='Apple' className={styles.socialIcon} />
        <span className={styles.text}>Продолжить с Apple</span>
      </Button>

      {/* Разделитель "или" */}
      <div className={styles.divider}>
        <span className={styles.dividerLine} />
        <span className={clsx(styles.text, styles.dividerText)}>или</span>
        <span className={styles.dividerLine} />
      </div>

      {/* Email */}
      <div className={styles.field}>
        <label htmlFor='email' className={styles.label}>
          Email
        </label>
        <Input
          name='email'
          type='email'
          value={values.email}
          onChange={(value) => onChange('email', value)}
          placeholder='Введите email'
          className={styles.input}
          errorText={hasGlobalError ? ' ' : emailErrorText}
        />
      </div>

      {/* Пароль */}
      <div className={styles.field}>
        <label htmlFor='password' className={styles.label}>
          Пароль
        </label>
        <Input
          name='password'
          type='password'
          value={values.password}
          onChange={(value) => onChange('password', value)}
          placeholder={passwordPlaceholder}
          className={styles.input}
          errorText={hasGlobalError ? ' ' : passwordErrorText}
          // 👉 ВАЖНО: подсказка уходит в infoText, рендерится внутри Input в div.message
          infoText={!hasGlobalError ? passwordHint : undefined}
        />

        {/* статус пароля (типа "Надёжный") — опционально */}
        {passwordStatusText && !hasGlobalError && (
          <p className={styles.passwordStatus}>{passwordStatusText}</p>
        )}
      </div>

      {/* глобальная ошибка логина */}
      {hasGlobalError && (
        <p className={styles.globalError}>{globalErrorText}</p>
      )}

      <div>
        <Button
          type='submit'
          style='primary'
          disabled={isLoading}
          className={styles.button}
        >
          {submitText}
        </Button>

        {showRegisterLink && (
          <NavLink
            to='/register'
            className={clsx(styles.linkReset, styles.registerLink)}
          >
            Зарегистрироваться
          </NavLink>
        )}
      </div>
    </form>
  );
};

export default AuthForm;
