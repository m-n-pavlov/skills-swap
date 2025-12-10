import clsx from 'clsx';
import styles from './StepIllustration.module.css';
import type { StepIllustrationProps } from './type';
import { STEPILLUSTRATION_CONFIG } from './config';

import StepIllustration1 from '../../../assets/images/light-bulb.png';
import StepIllustration2 from '../../../assets/images/user-info.png';
import StepIllustration3 from '../../../assets/images/school-board.png';

const IMAGE_MAP = {
  1: StepIllustration1,
  2: StepIllustration2,
  3: StepIllustration3
} as const;

export const StepIllustration = ({
  code,
  className,
  children
}: StepIllustrationProps) => {
  const { title, subtitle } = STEPILLUSTRATION_CONFIG[code];
  const imageSrc = IMAGE_MAP[code];

  return (
    <section className={clsx(styles.wrapper, className)}>
      {children ? (
        children
      ) : (
        <>
          <img src={imageSrc} alt={title} className={styles.image} />
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{subtitle}</p>
        </>
      )}
    </section>
  );
};
