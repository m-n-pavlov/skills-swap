import { Modal } from '../../shared/ui/Modal';
import { Button } from '../../shared/ui/Button';
import { Icon } from '../../shared/ui/Icon';
import type { SuccessProposalModalProps } from './type';
import styles from './SuccessProposalModal.module.css';

export const SuccessProposalModal = ({
  isOpen,
  onClose
}: SuccessProposalModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size='small'>
      <div
        className={styles.container}
        role='alertdialog'
        aria-labelledby='success-modal-title'
        aria-describedby='success-modal-desc'
      >
        <Icon
          name='userCircle'
          alt='Иконка пользователя'
          className={styles.icon}
        />
        <h2 id='success-modal-title' className={styles.title}>
          Ваше предложение создано
        </h2>
        <p id='success-modal-desc' className={styles.subtitle}>
          Теперь вы можете предложить обмен
        </p>
        <Button
          type='button'
          onClick={onClose}
          style='primary'
          className={styles.button}
        >
          Готово
        </Button>
      </div>
    </Modal>
  );
};
