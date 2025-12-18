// CSS-модуль для стилей компонента
import styles from './SkillPage.module.css';

// 🪝 Хуки
import { useCallback, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useExchangeSystem } from '../../features/exchange';
import { useSkillPage } from '../../features/skills/useSkillPageResult.ts';

// Импорт компонентов
import { UserCard } from '../../shared/ui/UserCard';
import { OfferPreviewForSkillPage } from '../../widgets/OfferPreviewForSkillPage';
import { CardsGallery } from '../../widgets/CardsGallery';
import { SuccessProposalModal } from '../../widgets/SuccessProposalModal';

// Redux
import { selectCurrentUser } from '../../app/store/slices/authSlice/authSelector.ts';
import { toggleLike } from '../../app/store/slices/authSlice/authSlice.ts';
import { useAppDispatch } from '../../shared/hooks';
import { useNavigate, useParams } from 'react-router-dom';

// ID пользователя открытой карточки (владельца навыка)

// Основной компонент страницы навыка
export const SkillPage = () => {
  const dispatch = useAppDispatch();
  const currentUser = useSelector(selectCurrentUser); // Получаем авторизованного пользователя
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();

  // стейт для хранения лайков пользователей в виде объекта { userId: boolean }
  const [likedUsers, setLikedUsers] = useState<Record<string, boolean>>({});

  // Инициализируем likedUsers из currentUser при загрузке
  useEffect(() => {
    if (currentUser?.likes) {
      const initialLikedUsers: Record<string, boolean> = {};
      currentUser.likes.forEach((cardId: string) => {
        initialLikedUsers[cardId] = true;
      });
      setLikedUsers(initialLikedUsers);
    }
  }, [currentUser]);

  const handleNavigationSkill = useCallback(
    (userId: string) => {
      navigate(`/skill/${userId}`);
    },
    [navigate]
  );

  // обработчик для переключения лайка пользователя (синхронизированный с Redux)
  const handleLikeToggle = useCallback(
    async (cardId: string) => {
      if (!currentUser) {
        console.warn('Пользователь не авторизован');
        return;
      }

      // Оптимистичное обновление UI
      const isCurrentlyLiked = likedUsers[cardId] || false;
      setLikedUsers((prev) => ({
        ...prev,
        [cardId]: !isCurrentlyLiked
      }));

      try {
        // Отправляем действие в Redux
        await dispatch(
          toggleLike({
            user: currentUser,
            cardId
          })
        ).unwrap();

        // После успешного обновления на сервере, синхронизируем с currentUser
        // (это произойдет автоматически через Redux)
      } catch (error) {
        // В случае ошибки откатываем оптимистичное обновление
        setLikedUsers((prev) => ({
          ...prev,
          [cardId]: isCurrentlyLiked
        }));
        console.error('Ошибка при обновлении лайка:', error);
      }
    },
    [currentUser, likedUsers, dispatch]
  );

  // функция для получения данных о лайках пользователя
  const getUserLikeData = useCallback(
    (userId: string, userLikes: number) => {
      const isLiked = likedUsers[userId] || false;
      const likesCount = isLiked ? userLikes + 1 : userLikes;
      return {
        isLiked,
        likesCount
      };
    },
    [likedUsers]
  );

  // Ранний return при отсутствии userId
  if (!userId) {
    console.warn('SkillPage: userId is missing in route params');
    return null;
  }

  // использование кастомного хука для получения данных страницы навыка
  const { user, skillId, offerPreviewData, recommendedUsers, isNotFound } =
    useSkillPage(userId);

  // Получаем именно id пользователя
  const exchangeOffersID = user?.id;

  // использование кастомного хука для работы с системой обмена
  const {
    handleOfferExchange,
    isModalOpen,
    closeModal,
    hasOffered,
    isLoading
  } = useExchangeSystem(exchangeOffersID ?? ''); // используем exchangeOffersID вместо skillId

  // если данные не найдены, показываем сообщение
  if (isNotFound) {
    return (
      <main className={styles.page}>
        <section className={styles.section}>
          <div>Пользователь не найден</div>
        </section>
      </main>
    );
  }

  // Получаем данные о лайках для текущего пользователя (владельца навыка)
  const userLikeData = user ? getUserLikeData(user.id, user.likes ?? 0) : null;

  // основной рендеринг компонента
  return (
    <main className={styles.page}>
      <div className={styles.content}>
        {/* Секция превью навыка */}
        <section className={styles.preview_skill}>
          {/* Условный рендеринг карточки пользователя, если данные есть */}
          {user ? (
            <UserCard
              key={user.id}
              user={user}
              avatar={{ size: 'medium' }}
              showLinkButton={false}
              className={styles.userCardItem}
            />
          ) : null}

          {/* Условный рендеринг превью предложения, если данные есть */}
          {offerPreviewData && user && (
            <OfferPreviewForSkillPage
              data={offerPreviewData}
              onExchangeClick={handleOfferExchange}
              isExchangeDisabled={!skillId || hasOffered}
              isLoading={isLoading}
              // Передаем данные о лайках пользователя
              userLikes={userLikeData?.likesCount ?? 0}
              isUserLiked={userLikeData?.isLiked ?? false}
              onUserLikeToggle={() => handleLikeToggle(user.id)}
            />
          )}
        </section>

        {/* Галерея карточек рекомендуемых пользователей */}
        <CardsGallery
          users={recommendedUsers}
          onLike={handleLikeToggle}
          onMore={handleNavigationSkill}
          getUserLikeData={getUserLikeData}
        />
      </div>

      {/* Модальное окно успешного предложения (управляется через isModalOpen) */}
      <SuccessProposalModal isOpen={isModalOpen} onClose={closeModal} />
    </main>
  );
};
