import { useState, type FormEvent } from 'react';
import styles from './AuthPage.module.css';
import { AuthForm } from '../../features/auth/ui/AuthForm/AuthForm';
import { StepIllustration } from '../../shared/ui/StepIllustration';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../../app/store';
import {
  selectAuthError,
  selectAuthLoading,
  selectAuthUser,
  selectIsAuth
} from '../../app/store/slices/authSlice/authSelector.ts';
import {
  fetchLogin,
  fetchLogout
} from '../../app/store/slices/authSlice/authSlice.ts';

export const AuthPage = () => {
  const [values, setValues] = useState({ email: '', password: '' });

  // локальная ошибка логина (одна на всю форму)
  const [globalError, setGlobalError] = useState<string | undefined>();

  const handleChange = (field: 'email' | 'password', value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    // При вводе — очищаем глобальную ошибку
    setGlobalError(undefined);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // здесь потом будет реальный запрос
    const success = false;

    if (!success) {
      setGlobalError(
        'Email или пароль введён неверно. Пожалуйста, проверьте правильность введённых данных'
      );
      return;
    }

    console.log('submit', values);
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Вход</h1>

      <div className={styles.content}>
        <div className={styles.formSection}>
          <AuthForm
            values={values}
            onChange={handleChange}
            onSubmit={handleSubmit}
            isLoading={false}
            submitText='Войти'
            showRegisterLink={true}
            passwordPlaceholder='Введите ваш пароль'
            // 👉 сюда передаём текст "Пароль должен содержать не менее 8 знаков"
            passwordHint='Пароль должен содержать не менее 8 знаков'
            globalErrorText={globalError}
          />
        </div>

        <div className={styles.illustrationSection}>
          <StepIllustration code={1} />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
