import { NavLink } from 'react-router-dom';
import { Icon } from '../icon';
import styles from './userMenu.module.css';
import type { MenuItem } from './type';
import { memo } from 'react';

export const UserMenu = memo(() => {
  const menuItems: MenuItem[] = [
    {
      id: 'applications',
      label: 'Заявки',
      icon: <Icon name='notification' alt='иконка уведомления' />,
      path: '/applications',
      disabled: true
    },
    {
      id: 'exchanges',
      label: 'Мои обмены',
      icon: <Icon name='messageText' alt='иконка сообщения' />,
      path: '/exchanges',
      disabled: true
    },
    {
      id: 'favorites',
      label: 'Избранное',
      icon: <Icon name='like' alt='иконка сердца' />,
      path: '/favorites',
      disabled: true
    },
    {
      id: 'skills',
      label: 'Мои навыки',
      icon: <Icon name='idea' alt='иконка лампочки' />,
      path: '/skills',
      disabled: true
    },
    {
      id: 'personal',
      label: 'Личные данные',
      icon: <Icon name='user' alt='иконка фигуры пользователя' />,
      path: '/personal',
      disabled: false
    }
  ];

  return (
    <nav className={styles.userMenu}>
      <ul className={styles.list}>
        {menuItems.map((item) => (
          <li key={item.id} className={styles.item}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `${styles.link} ${item.disabled ? styles.linkDisabled : ''} ${isActive ? styles.linkActive : ''}`
              }
              onClick={(e) => {
                if (item.disabled) {
                  e.preventDefault();
                }
              }}
              aria-disabled={item.disabled}
            >
              <span className={styles.icon}>{item.icon}</span>
              <span className={styles.label}>{item.label}</span>
              {item.count !== undefined && (
                <span className={styles.label}>{item.count}</span>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
});
