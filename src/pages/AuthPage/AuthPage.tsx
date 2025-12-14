import { useCallback } from 'react';
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

  const handleChange = useCallback(
    (field: 'email' | 'password', value: string) => {
      if (field === 'email') {
        handleEmailChange(value);
      } else {
        handlePasswordChange(value);
      }
    },
    [handleEmailChange, handlePasswordChange]
  );

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Вход</h1>

      <div className={styles.content}>
        <div className={styles.formSection}>
          <AuthForm
            values={{ email, password }}
            onChange={handleChange}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            submitText='Войти'
            showRegisterLink
            passwordPlaceholder='Введите ваш пароль'
            passwordHint={undefined}
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
