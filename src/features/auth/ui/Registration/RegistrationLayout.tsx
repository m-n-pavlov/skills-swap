import styles from './Registration.module.css';
import { StepProgress } from '../../../../shared/ui/StepProgrees';
import { StepIllustration } from '../../../../shared/ui/StepIllustration';
import type { RegistrationLayoutProps } from './type';

export const RegistrationLayout = ({
  currentStep,
  children
}: RegistrationLayoutProps) => {
  return (
    <div className={styles.page}>
      <StepProgress
        currentStep={currentStep}
        totalSteps={3}
        className={styles.progress}
      />

      <div className={styles.content}>
        {/* Левая колонка */}
        <section className={styles.column}>
          <div className={styles.card}>{children}</div>
        </section>

        {/* Правая колонка с иллюстрацией */}
        <section className={styles.column}>
          <div className={styles.card}>
            <StepIllustration code={currentStep} />
          </div>
        </section>
      </div>
    </div>
  );
};
