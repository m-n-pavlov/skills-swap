import { useRef, useEffect, memo } from 'react';
import styles from './AccountDropdown.module.css';
import type { AccountDropdownProps } from './type';
import { Icon } from '../../shared/ui/Icon';

export const AccountDropdown = memo(
  ({ isOpen, onClose, onLogout }: AccountDropdownProps) => {
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          onClose();
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isOpen, onClose]);

    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      if (isOpen) {
        document.addEventListener('keydown', handleKeyDown);
      }

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
      <div className={styles.dropdown} ref={dropdownRef} role='menu'>
        <a href='/profile' className={styles.item} role='menuitem'>
          Личный кабинет
        </a>
        <button
          type='button'
          onClick={onLogout}
          className={styles.item}
          role='menuitem'
        >
          Выйти из аккаунта
          <Icon name='logout' alt='Выйти из аккаунта' className={styles.icon} />
        </button>
      </div>
    );
  }
);
