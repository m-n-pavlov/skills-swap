import { useEffect, useRef } from 'react';
import styles from './modal.module.scss';
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  primaryButton: {
    text: string;
    onClick: () => void;
  };
  secondaryButton?: {
    text: string;
    onClick: () => void;
  };
  variant?: ModalVariant;
}

type ModalVariant = 'success' | 'login' | 'change' | 'await' | '';
//sucsess - модалка "Ваше предложение создано"
//login - модалка "Аутентификация"
//change - модалка "Ваше предложение"
//await - модалка "Вы предложили обмен"

const Modal = React.memo(
  ({
    isOpen,
    onClose,
    title,
    subtitle,
    icon,
    children,
    primaryButton,
    secondaryButton,
    variant = ''
  }: ModalProps) => {
    if (!isOpen) return null;
    const modalRef = useRef<HTMLDivElement>(null);

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
      // закрытие по оверлей
      if (e.target === e.currentTarget) {
        onClose();
      }
    };

    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        // закрытие по Esc
        if (e.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleKeyDown); // удаление слушателей
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, [onClose]);

    useEffect(() => {
      const modal = modalRef.current;
      if (modal) {
        modal.focus();
      }
    }, []);

    const modalVariant = `${variant}-modal`; // класс для установки названия модалки

    return (
      <div className={styles.overlay} onClick={handleOverlayClick}>
        <div className={`${styles.modal} ${modalVariant}`} ref={modalRef}>
          {icon && <div className={styles.icon}>{icon}</div>}
          <h2 className={styles.title}>{title}</h2>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          {children && <div className={styles.content}>{children}</div>}
          <div className={styles.buttons}>
            {secondaryButton && (
              <button
                className={styles.secondaryButton}
                onClick={secondaryButton.onClick}
              >
                {secondaryButton.text}
              </button>
            )}
            <button
              className={styles.primaryButton}
              onClick={primaryButton.onClick}
            >
              {primaryButton.text}
            </button>
          </div>
        </div>
      </div>
    );
  }
);

export default Modal;
