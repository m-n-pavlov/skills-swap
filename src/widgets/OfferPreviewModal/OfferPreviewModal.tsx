import type { FC } from 'react';
import { Modal } from '../../shared/ui/Modal/Modal';
import { OfferPreviewCard } from '../OfferPreviewCard/OfferPreviewCard';
import { Button } from '../../shared/ui/Button';
import { Icon } from '../../shared/ui/Icon';
import styles from './OfferPreviewModal.module.css';
import type { OfferPreviewModalProps } from './type';

export const OfferPreviewModal: FC<OfferPreviewModalProps> = ({
  isOpen,
  onClose,
  data,
  onEdit,
  onConfirm,
  isSubmitting
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size='medium'>
      <div className={styles.content}>
        <header className={styles.header}>
          <h2 className={styles.title}>Ваше предложение</h2>
          <p className={styles.subtitle}>
            Пожалуйста, проверьте и подтвердите правильность данных
          </p>
        </header>

        <OfferPreviewCard
          title={data.title}
          categoryPath={data.category}
          description={data.description}
          images={data.images}
          actions={
            <>
              <Button
                type='button'
                style='secondary'
                className={styles.buttonWithIcon}
                onClick={onEdit}
                disabled={isSubmitting}
              >
                Редактировать
                <Icon alt='Редактировать' name='edit' />
              </Button>

              <Button
                type='button'
                style='primary'
                className={styles.button}
                onClick={onConfirm}
                disabled={isSubmitting}
              >
                Готово
              </Button>
            </>
          }
        />
      </div>
    </Modal>
  );
};
