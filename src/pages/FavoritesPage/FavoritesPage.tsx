import { memo, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import styles from './FavoritesPage.module.css';
import { UserCardList } from '../../widgets/UserCardList';
import { UserMenu } from '../../widgets/UserMenu';
import { useUsersWithDetails } from '../../features/users';
import { selectCurrentUser } from '../../app/store/slices/authSlice/authSelector.ts';
import { useAppDispatch } from '../../shared/hooks';
import { toggleLike } from '../../app/store/slices/authSlice/authSlice';
import type { IconName } from '../../shared/ui/Icon/icons.ts';

export const FavoritesPage = memo(function FavoritesPage() {
  const dispatch = useAppDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const allUsers = useUsersWithDetails();

  const favoriteUsers = useMemo(() => {
    if (!currentUser || !currentUser.likes || currentUser.likes.length === 0) {
      return [];
    }

    return allUsers.filter((user) => currentUser.likes?.includes(user.id));
  }, [currentUser, allUsers]);

  const handleLike = useCallback(
    async (userId: string) => {
      if (!currentUser) {
        console.warn('Пользователь не авторизован');
        return;
      }

      try {
        await dispatch(
          toggleLike({
            user: currentUser,
            cardId: userId
          })
        ).unwrap();
      } catch (error) {
        console.error('Ошибка при обновлении лайка:', error);
      }
    },
    [currentUser, dispatch]
  );

  const handleMore = useCallback((userId: string) => {
    console.log('✅ Клик на кнопку "Подробнее" для пользователя с ID:', userId);
  }, []);

  const getUserLikeData = useCallback(
    (userId: string, userLikesCount: number) => {
      const isLiked = currentUser?.likes?.includes(userId) || false;

      const likesCount = isLiked ? userLikesCount + 1 : userLikesCount;

      return {
        isLiked,
        likesCount
      };
    },
    [currentUser]
  );

  const favoriteCount = currentUser?.likes?.length || 0;

  const linkButtonActionType: 'navigate' | 'tradeStatus' = 'tradeStatus';
  const linkButtonIconName: IconName = 'clock';

  if (!currentUser) {
    return (
      <div className={styles.container}>
        <aside className={styles.menuColumn}>
          <UserMenu defaultActiveId='favorites' />
        </aside>
        <main className={styles.contentColumn}>
          <div className={styles.emptyState}>
            <p>Войдите в систему, чтобы видеть избранное</p>
          </div>
        </main>
      </div>
    );
  }

  if (favoriteCount === 0) {
    return (
      <div className={styles.container}>
        <aside className={styles.menuColumn}>
          <UserMenu defaultActiveId='favorites' />
        </aside>
        <main className={styles.contentColumn}>
          <p className={styles.contentHeader}>Избранное: 0</p>
          <div className={styles.emptyState}>
            <p>У вас пока нет избранных пользователей</p>
            <p>
              Нажмите на сердечко на карточке пользователя, чтобы добавить его в
              избранное
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <aside className={styles.menuColumn}>
        <UserMenu defaultActiveId='favorites' />
      </aside>

      <main className={styles.contentColumn}>
        <p className={styles.contentHeader}>Избранное: {favoriteCount}</p>
        <UserCardList
          users={favoriteUsers}
          onLike={handleLike}
          onMore={handleMore}
          getUserLikeData={getUserLikeData}
          linkButtonActionType={linkButtonActionType}
          linkButtonIconName={linkButtonIconName}
        />
      </main>
    </div>
  );
});
