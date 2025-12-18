import styles from './PersonNotFoundPage.module.css';
import type { FC } from 'react';
import { usePersonForm } from '../../features/PersonForm/lib/usePersonForm.ts';
import { UserMenu } from '../../widgets/UserMenu';
import { ErrorPage } from '../../shared/ui/ErrorPage';

export const PersonNotFoundPage: FC = () => {
  const { currentUser } = usePersonForm();

  if (!currentUser) {
    return (
      <section className={styles.wrap}>
        <UserMenu />
        <p>Нужно войти в аккаунт, чтобы редактировать профиль.</p>
      </section>
    );
  }

  return (
    <section className={styles.wrap}>
      <UserMenu />
      <main className={styles.contentColumn}>
        <ErrorPage code={404} />
      </main>
    </section>
  );
};
