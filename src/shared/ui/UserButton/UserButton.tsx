import { type FC, useState, useEffect, useRef, useCallback } from 'react';
import { Avatar } from '../Avatar';
import styles from './UserButton.module.css';
import type { UserButtonUIProps } from './type';
import { clsx } from 'clsx';
import { NavLink } from 'react-router-dom';
import { Icon } from '../Icon';

export const UserButtonUI: FC<UserButtonUIProps> = ({
  className,
  size,
  alt,
  name,
  avatarUrl,
  handleLogOut,
  hrefProfile
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);
  const closeMenu = useCallback(() => setIsOpen(false), []);

  // Закрытие при клике вне области
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, closeMenu]);

  const handleLogoutClick = useCallback(() => {
    closeMenu();
    if (handleLogOut) {
      handleLogOut();
    }
  }, [handleLogOut, closeMenu]);

  return (
    <div className={clsx(styles.container, className)} ref={containerRef}>
      <button
        type='button'
        className={styles.button}
        onClick={toggleMenu}
        aria-expanded={isOpen}
        aria-haspopup='menu'
        aria-label='Меню пользователя'
      >
        <span className={styles.user_name}>{name ?? 'Гость'}</span>
        <Avatar
          size={size}
          avatarUrl={avatarUrl}
          alt={alt ?? 'User avatar'}
          className={styles.user_avatar}
        />
      </button>
      {isOpen && (
        <div className={styles.popover} role='menu'>
          <div className={styles.wrapper}>
            <NavLink
              to={hrefProfile}
              className={styles.linkProfile}
              onClick={closeMenu}
              role='menuitem'
            >
              Личный кабинет
            </NavLink>
            <button
              onClick={handleLogoutClick}
              type='button'
              className={styles.buttonLogout}
              role='menuitem'
            >
              <span>Выйти из аккаунта</span>
              <Icon
                name='logout'
                aria-hidden='true'
                alt={'Кнопка выхода из профиля'}
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
