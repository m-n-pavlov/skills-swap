import { type FormEvent } from 'react';
import styles from './AuthPage.module.css';
import { AuthForm } from '../../features/auth/ui/AuthForm/AuthForm';
import { StepIllustration } from '../../shared/ui/StepIllustration';
import { useAuthForm } from '../../features/auth/lib/useAuthForm';

export const AuthPage = () => {
  const {
    email,
    password,
    emailError,
    passwordError,
    serverError,
    isLoading,
    isFormValid,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit
  } = useAuthForm();

  // адаптер под интерфейс AuthForm.onChange(field, value)
  const handleChange = (field: 'email' | 'password', value: string) => {
    if (field === 'email') {
      handleEmailChange(value);
    } else {
      handlePasswordChange(value);
    }
  };

  // адаптер под AuthForm.onSubmit
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    void handleSubmit(event); // handleSubmit уже вызывает preventDefault и делает всё остальное
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Вход</h1>

      <div className={styles.content}>
        <div className={styles.formSection}>
          <AuthForm
            // значения полей теперь берём из useAuthForm
            values={{ email, password }}
            onChange={handleChange}
            onSubmit={onSubmit}
            isLoading={isLoading}
            submitText='Войти'
            showRegisterLink={true}
            passwordPlaceholder='Введите ваш пароль'
            passwordHint='Пароль должен содержать не менее 8 знаков'
            // глобальная ошибка — это ошибка авторизации из Redux
            globalErrorText={serverError ?? undefined}
            emailErrorText={emailError ?? undefined}
            passwordErrorText={passwordError ?? undefined}
            passwordStatusText={undefined}
            isSubmitDisabled={!isFormValid}
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
