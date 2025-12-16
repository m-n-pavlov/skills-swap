import { memo, useState, useEffect } from 'react';
import { ProfileMenuLink } from '../../shared/ui/ProfileMenuLink';
import styles from './UserMenu.module.css';
import { menuItems, type UserMenuProps } from './type';
import type { MouseEvent } from 'react';

export const UserMenu = memo(({ defaultActiveId }: UserMenuProps) => {
  const initialActiveId = defaultActiveId || menuItems[0]?.id || '';

  const [activeItemId, setActiveItemId] = useState<string>(initialActiveId);

  useEffect(() => {
    if (defaultActiveId) {
      setActiveItemId(defaultActiveId);
    }
  }, [defaultActiveId]);

  const handleItemClick = (id: string, disabled: boolean, e: MouseEvent) => {
    e.preventDefault();
    if (!disabled) {
      setActiveItemId(id);
    }
  };

  return (
    <div className={styles.menuContainer}>
      <nav className={styles.userMenu}>
        <ul className={styles.list}>
          {menuItems.map((item) => (
            <ProfileMenuLink
              key={item.id}
              item={item}
              isActive={activeItemId === item.id}
              onClick={handleItemClick}
            />
          ))}
        </ul>
      </nav>
    </div>
  );
});
