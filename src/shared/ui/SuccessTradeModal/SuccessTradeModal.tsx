import { Modal } from '../Modal';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import styles from './SuccessTradeModal.module.css';
import type { SuccessModalProps } from './type';
import { memo } from 'react';

export const SuccessTradeModal = memo(
  ({ isOpen, onClose, iconName }: SuccessModalProps) => {
    return (
      <Modal isOpen={isOpen} onClose={onClose} size='smallx2'>
        <div
          className={styles.successModal}
          role='alertdialog'
          aria-labelledby='trade-modal-title'
          aria-describedby='trade-modal-desc'
        >
          <div className={styles.iconContainer}>
            <Icon
              name={iconName}
              alt={`иконка ${iconName}`}
              className={styles.icon}
            />
          </div>

          <h2 id='trade-modal-title' className={styles.title}>
            Вы предложили обмен
          </h2>

          <p id='trade-modal-desc' className={styles.message}>
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
