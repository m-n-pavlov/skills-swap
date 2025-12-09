import { NavLink } from 'react-router-dom';
import styles from './userMenu.module.css';
import { memo } from 'react';
import { MenuItems } from '../Widgets/ProfileWidgets';
import { useState, useMemo } from 'react';

export const UserMenu = memo(() => {
  const initialActiveId = useMemo(() => {
    return (
      MenuItems.find((item) => item.isActive === true)?.id ||
      MenuItems[0]?.id ||
      ''
    );
  }, []);
  const [activeItemId, setActiveItemId] = useState<string>(initialActiveId);
  const handleItemClick = (
    id: string,
    disabled: boolean,
    e: React.MouseEvent
  ) => {
    e.preventDefault();
    if (!disabled) {
      setActiveItemId(id);
    }
  };

  return (
    <div className={styles.menuContainer}>
      <nav className={styles.userMenu}>
        <ul className={styles.list}>
          {MenuItems.map((item) => {
            const isActive = activeItemId === item.id;
            return (
              <li key={item.id} className={styles.item}>
                <NavLink
                  to='#'
                  className={`${styles.link} ${isActive ? styles.linkActive : ''} ${item.disabled ? styles.linkDisabled : ''}`}
                  onClick={(e) =>
                    handleItemClick(item.id, item.disabled || false, e)
                  }
                  style={{ textDecoration: 'none' }}
                >
                  <span className={styles.icon}>{item.icon}</span>
                  <span className={styles.label}>{item.label}</span>
                  {item.count !== undefined && (
                    <span className={styles.badge}>{item.count}</span>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
});
