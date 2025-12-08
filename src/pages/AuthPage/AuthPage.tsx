import { useState, type FormEvent } from 'react';
import styles from './AuthPage.module.css';
import { AuthForm } from '../../features/auth/ui/AuthForm/AuthForm';
import { StepIllustration } from '../../shared/ui/StepIllustration';

export const AuthPage = () => {
  const [values, setValues] = useState({ email: '', password: '' });

  const handleChange = (field: 'email' | 'password', value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('submit', values);
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
            isLoading={false}
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
