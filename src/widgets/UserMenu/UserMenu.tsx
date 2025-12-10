import { memo, useState, useMemo } from 'react';
import { ProfileMenuLink } from '../../shared/ui/ProfileMenuLink/ProfileMenuLink';
import styles from './UserMenu.module.css';
import { menuItems } from './type';

export const UserMenu = memo(() => {
  const initialActiveId = useMemo(() => {
    return (
      menuItems.find((item) => item.isActive === true)?.id ||
      menuItems[0]?.id ||
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
