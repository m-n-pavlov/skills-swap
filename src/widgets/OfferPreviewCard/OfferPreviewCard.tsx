// OfferPreviewCard/OfferPreviewCard.tsx
import type { FC } from 'react';
import { PhotoGallery } from '../../shared/ui/PhotoGallery';
import styles from './OfferPreviewCard.module.css';
import type { OfferPreviewCardProps } from './type';

export const OfferPreviewCard: FC<OfferPreviewCardProps> = ({
  title,
  categoryPath,
  description,
  images,
  actions
}) => {
  return (
    <section className={styles.card}>
      {/* левая колонка */}
      <div className={styles.text}>
        <div className={styles.textTop}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.category}>{categoryPath}</p>
          <p className={styles.description}>{description}</p>
        </div>
        <div className={styles.actions}>{actions}</div>
      </div>

      {/* правая колонка — фотогалерея */}
      <div className={styles.gallery}>
        <PhotoGallery images={images} />
      </div>
    </section>
  );
};
