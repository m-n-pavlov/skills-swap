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

  // ===== Этот код я добавил =======
  const isAuth = useSelector(selectIsAuth);
  const user = useSelector(selectAuthUser);

  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  // ===== ======= ======= =======

  const handleChange = (field: 'email' | 'password', value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // ===== Этот код я добавил =======
    if (isAuth) {
      // Пользователь авторизован → разлогиниваем
      dispatch(fetchLogout())
        .unwrap()
        .then(() => console.log('Пользователь вышел'))
        .catch((err) => console.error('Ошибка выхода:', err));
    } else {
      // Пользователь не авторизован → логиним
      dispatch(fetchLogin(values))
        .unwrap()
        .then((user) => console.log('Успешный вход', user))
        .catch((err) => console.error('Ошибка входа:', err));
    }

    // ===== ======= ======= =======
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Вход</h1>

      <div className={styles.content}>
        {/* Левая колонка — форма */}
        <div className={styles.formSection}>
          <AuthForm
            values={values}
            onChange={handleChange}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>

        {/* Правая колонка — иллюстрация */}
        <div className={styles.illustrationSection}>
          <StepIllustration code={1} />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
