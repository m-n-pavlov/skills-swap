import type { FormEvent } from 'react';
import type { AuthFormProps } from './type';
import styles from './AuthForm.module.css';

import { Input } from '../../../../shared/ui/Input';
import { Button } from '../../../../shared/ui/Button/Button';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

export const AuthForm = ({
  values,
  onChange,
  onSubmit,
  isLoading,
  className
}: AuthFormProps) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(event);
  };

  return (
    <>
      <form
        className={clsx(styles.form_content, className)}
        onSubmit={handleSubmit}
      >
        {/* Соц-кнопки */}
        {/* <div className={styles.socialButtons}> */}
        <Button
          type='button'
          style='secondary'
          onClick={() => {}}
          className={styles.socialButton}
          iconName='google'
          iconAlt='Google'
          iconPosition='left'
        >
          <span className={styles.text}>Продолжить с Google</span>
        </Button>

        <Button
          type='button'
          style='secondary'
          onClick={() => {}}
          className={styles.socialButton}
          iconName='apple'
          iconAlt='Apple'
          iconPosition='left'
        >
          <span className={styles.text}>Продолжить с Apple</span>
        </Button>
        {/* </div> */}

        {/* Разделитель "или" */}
        <div className={styles.divider}>
          <span className={styles.dividerLine} />
          <span className={clsx(styles.text, styles.dividerText)}>или</span>
          <span className={styles.dividerLine} />
        </div>

        {/* Поля формы */}
        <div className={styles.fields}>
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
            />
          </div>

          <div className={styles.field}>
            <label htmlFor='password' className={styles.label}>
              Пароль
            </label>
            <Input
              name='password'
              type='password'
              value={values.password}
              onChange={(value) => onChange('password', value)}
              placeholder='Введите ваш пароль'
              className={styles.input}
            />
          </div>
        </div>

        {/* Кнопка отправки */}
        <div>
          <Button
            type='submit'
            style='primary'
            disabled={isLoading}
            className={styles.button}
          >
            Войти
          </Button>
          {/* Ссылка "Зарегистрироваться" */}
          <NavLink
            to='/register'
            className={clsx(styles.linkReset, styles.registerLink)}
          >
            Зарегистрироваться
          </NavLink>
        </div>
      </form>
    </>
  );
};

export default AuthForm;
