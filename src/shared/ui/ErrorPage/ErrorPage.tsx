import clsx from 'clsx';

import styles from './ErrorPage.module.css';
import type { ErrorPageProps } from './type';
import { ERROR_CONFIG } from './config';

import Error404Image from '../../../assets/images/error 404.png';
import Error500Image from '../../../assets/images/error 500.png';

export const ErrorPage = ({ code, className }: ErrorPageProps) => {
  const { title, description } = ERROR_CONFIG[code];

  const imageSrc = code === 404 ? Error404Image : Error500Image;

  return (
    <main
      className={clsx(styles.error_page, className)}
      aria-labelledby='error-title'
    >
      <section role='alert' className={styles.error_content}>
        <img src={imageSrc} alt={title} className={styles.error_illustration} />

        <h2 id='error-title' className={styles.error_title}>
          {title}
        </h2>

        <p className={styles.error_description}>{description}</p>

        <div className={styles.error_actions}>
          <button
            type='button'
            className={styles.error_button_secondary}
            onClick={() => {}}
          >
            Сообщить об ошибке
          </button>

          <button
            type='button'
            className={styles.error_button_primary}
            onClick={() => {}}
          >
            На главную
          </button>
        </div>
      </section>
    </main>
  );
};
