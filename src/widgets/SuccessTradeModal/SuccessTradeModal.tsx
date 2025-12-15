import { Modal } from '../../shared/ui/Modal';
import { Button } from '../../shared/ui/Button/Button';
import { Icon } from '../../shared/ui/Icon/Icon';
import styles from './SuccessModal.module.css';
import type { SuccessModalProps } from './type';
import { memo } from 'react';

export const SuccessModal = memo(
  ({ isOpen, onClose, iconName }: SuccessModalProps) => {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className={styles.successModal}>
          <div className={styles.iconContainer}>
            <Icon name={iconName} alt={`иконка ${iconName}`} />
          </div>

          <h2 className={styles.title}>Вы предложили обмен</h2>

          <p className={styles.message}>
            Теперь дождитесь подтверждения. Вам придёт уведомление
          </p>

          <div className={styles.buttonContainer}>
            <Button onClick={onClose} style='primary' type='button'>
              Готово
            </Button>
          </div>
        </div>
      </Modal>
    );
  }
);
