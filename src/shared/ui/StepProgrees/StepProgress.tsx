import clsx from 'clsx';
import styles from './StepProgress.module.css';
import type { StepProgressProps } from './type';

export const StepProgress = ({
  currentStep,
  totalSteps,
  className
}: StepProgressProps) => {
  const steps: number[] = [];

  for (let i = 1; i <= totalSteps; i += 1) {
    steps.push(i);
  }

  return (
    <div className={clsx(styles.wrapper, className)}>
      <p className={styles.title}>
        Шаг {currentStep} из {totalSteps}
      </p>

      <div className={styles.lines}>
        {steps.map((step) => (
          <span
            key={step}
            className={clsx(
              styles.line,
              step <= currentStep && styles.line_active
            )}
          />
        ))}
      </div>
    </div>
  );
};
