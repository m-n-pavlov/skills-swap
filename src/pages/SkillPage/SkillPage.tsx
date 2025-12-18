import styles from './SkillPage.module.css';

import { useCallback, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useExchangeSystem } from '../../features/exchange';
import { useSkillPage } from '../../features/skills/useSkillPageResult.ts';

import { UserCard } from '../../shared/ui/UserCard';
import { OfferPreviewForSkillPage } from '../../widgets/OfferPreviewForSkillPage';
import { CardsGallery } from '../../widgets/CardsGallery';
import { SuccessProposalModal } from '../../widgets/SuccessProposalModal';

import { selectCurrentUser } from '../../app/store/slices/authSlice/authSelector.ts';
import { toggleLike } from '../../app/store/slices/authSlice/authSlice.ts';
import { useAppDispatch } from '../../shared/hooks';
import { useNavigate, useParams } from 'react-router-dom';

export const SkillPage = () => {
  const dispatch = useAppDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();

  const [likedUsers, setLikedUsers] = useState<Record<string, boolean>>({});

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

  const handleLikeToggle = useCallback(
    async (cardId: string) => {
      if (!currentUser) {
        console.warn('Пользователь не авторизован');
        return;
      }

      const isCurrentlyLiked = likedUsers[cardId] || false;
      setLikedUsers((prev) => ({
        ...prev,
        [cardId]: !isCurrentlyLiked
      }));

      try {
        await dispatch(
          toggleLike({
            user: currentUser,
            cardId
          })
        ).unwrap();

      } catch (error) {
        setLikedUsers((prev) => ({
          ...prev,
          [cardId]: isCurrentlyLiked
        }));
        console.error('Ошибка при обновлении лайка:', error);
      }
    },
    [currentUser, likedUsers, dispatch]
  );

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

  if (!userId) {
    console.warn('SkillPage: userId is missing in route params');
    return null;
  }

  const { user, skillId, offerPreviewData, recommendedUsers, isNotFound } =
    useSkillPage(userId);

  const exchangeOffersID = user?.id;

  const {
    handleOfferExchange,
    isModalOpen,
    closeModal,
    hasOffered,
    isLoading
  } = useExchangeSystem(exchangeOffersID ?? '');

  if (isNotFound) {
    return (
      <main className={styles.page}>
        <section className={styles.section}>
          <div>Пользователь не найден</div>
        </section>
      </main>
    );
  }

  const userLikeData = user ? getUserLikeData(user.id, user.likes ?? 0) : null;

  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <section className={styles.preview_skill}>
          {user ? (
            <UserCard
              key={user.id}
              user={user}
              avatar={{ size: 'medium' }}
              showLinkButton={false}
              className={styles.userCardItem}
            />
          ) : null}

          {offerPreviewData && user && (
            <OfferPreviewForSkillPage
              data={offerPreviewData}
              onExchangeClick={handleOfferExchange}
              isExchangeDisabled={!skillId || hasOffered}
              isLoading={isLoading}
              userLikes={userLikeData?.likesCount ?? 0}
              isUserLiked={userLikeData?.isLiked ?? false}
              onUserLikeToggle={() => handleLikeToggle(user.id)}
            />
          )}
        </section>

        <CardsGallery
          users={recommendedUsers}
          onLike={handleLikeToggle}
          onMore={handleNavigationSkill}
          getUserLikeData={getUserLikeData}
        />
      </div>

      <SuccessProposalModal isOpen={isModalOpen} onClose={closeModal} />
    </main>
  );
};
