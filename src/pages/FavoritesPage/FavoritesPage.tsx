import { memo, useState, useCallback } from 'react'; // импорт необходимых функций из React
import styles from './FavoritesPage.module.css'; // импорт CSS-модуля
import type { TUserWithDetails } from '../../features/users'; // импорт типа данных пользователя
import { UserCardList } from '../../widgets/UserCardList'; // импорт компонента списка карточек пользователей
import { UserMenu } from '../../widgets/UserMenu'; // импорт компонента бокового меню пользователя
import { mockUsers } from './mockUsers.ts';
import type { IconName } from '../../shared/ui/Icon/icons.ts'; // импорт моковых данных пользователей из локального файла

// Мемоизированный компонент страницы "Избранное"
export const FavoritesPage = memo(function FavoritesPage() {
  const [users] = useState<TUserWithDetails[]>(mockUsers); // состояние для хранения списка пользователей
  const [userLikes, setUserLikes] = useState<Record<string, boolean>>({}); // состояние для хранения лайков пользователей = { [key: string]: boolean; }

  // Мемоизированная функция обработки лайков
  const handleLike = useCallback((userId: string) => {
    setUserLikes((prev) => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  }, []);

  // Мемоизированная функция обработки клика на кнопку "Подробнее"
  const handleMore = useCallback((userId: string) => {
    console.log(
      '✅ Клик на кнопку "Обмен предложен"/"Подробнее" для пользователя с ID:',
      userId
    ); // навигация или открытие модального окна
  }, []);

  // Мемоизированная функция для получения данных о лайках пользователя
  const getUserLikeData = useCallback(
    (
      userId: string, // ID пользователя
      userLikesCount: number // текущее количество лайков пользователя
    ) => {
      const isLiked = userLikes[userId] || false;
      return {
        isLiked,
        likesCount: isLiked ? userLikesCount + 1 : userLikesCount
      };
    },
    [userLikes]
  );

  const favoriteCount = Object.values(userLikes).filter(Boolean).length;

  // для теста второго варианта кнопки
  // const testActionType: 'navigate' = 'navigate';
  const testActionType: 'tradeStatus' = 'tradeStatus';
  const testIconName: IconName = 'clock';

  // Возвращаемая JSX разметка компонента
  return (
    <div className={styles.container}>
      {/* Боковое меню пользователя */}
      <aside className={styles.menuColumn}>
        <UserMenu defaultActiveId='favorites' />
      </aside>

      {/* Обертка и список карточек пользователей */}
      <main className={styles.contentColumn}>
        <p className={styles.contentHeader}>Избранное: {favoriteCount}</p>
        <UserCardList
          users={users}
          onLike={handleLike}
          onMore={handleMore}
          getUserLikeData={getUserLikeData}
          // для теста второго варианта кнопки 👇
          linkButtonActionType={testActionType}
          linkButtonIconName={testIconName}
        />
      </main>
    </div>
  );
});
