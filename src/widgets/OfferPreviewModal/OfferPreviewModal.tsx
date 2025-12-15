import type { FC } from 'react';
import { Modal } from '../../shared/ui/Modal/Modal';
import { OfferPreviewCard } from '../OfferPreviewCard/OfferPreviewCard';
import { Button } from '../../shared/ui/Button';
import { ButtonIcon } from '../../shared/ui/ButtonIcon';
import styles from './OfferPreviewModal.module.css';
import type { OfferPreviewModalProps } from './type';

const mockImages: string[] = [
  'https://placehold.co/600x400?text=Фото+1',
  'https://placehold.co/600x400?text=Фото+2',
  'https://placehold.co/600x400?text=Фото+3',
  'https://placehold.co/600x400?text=Фото+4'
];

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
          images={data.images ?? mockImages}
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
                <ButtonIcon name='Редактировать' iconName='edit' />
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
