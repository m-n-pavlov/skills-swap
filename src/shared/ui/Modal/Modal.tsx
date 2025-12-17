import { useEffect, useRef } from 'react';
import styles from './Modal.module.css';
import React from 'react';
import type { ModalProps } from './type';

export const Modal = React.memo(
  ({ isOpen, onClose, children, size = 'medium' }: ModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
      // закрытие модалки по клику на оверлей
      if (e.target === e.currentTarget) {
        onClose();
      }
    };

    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        // закрытие модалки по ESC
        if (e.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, [onClose]);

    useEffect(() => {
      // установка фокуса на модалку
      const modal = modalRef.current;
      if (modal) {
        modal.focus();
      }
    }, []);

    useEffect(() => {
      if (!isOpen) return;
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow || 'auto';
      };
    }, [isOpen]);

    if (!isOpen) return null;

    const modalSize = styles[`${size}-modal`]; // установка размера модалки

    return (
      <div className={styles.overlay} onClick={handleOverlayClick}>
        <div
          className={`${styles.modal} ${modalSize}`}
          ref={modalRef}
          tabIndex={-1} // фокус по умолчанию
        >
          {children}
        </div>
      </div>
    );
  }
);
