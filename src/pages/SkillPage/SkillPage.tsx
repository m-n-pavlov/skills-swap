import styles from './SkillPage.module.css';
import { UserCard } from '../../shared/ui/UserCard';
import { OfferPreviewForSkillPage } from '../../widgets/OfferPreviewForSkillPage';
import { useSkillPage } from '../../features/skills/useSkillPageResult.ts';
import { useCallback, useState } from 'react';
import { CardsGallery } from '../../widgets/CardsGallery';
import { useExchangeSystem } from '../../features/exchange';
import { SuccessProposalModal } from '../../widgets/SuccessProposalModal';

const userId = '2';

export const SkillPage = () => {
  const [likedUsers, setLikedUsers] = useState<Record<string, boolean>>({});

  const handleLikeToggle = useCallback((userId: string) => {
    setLikedUsers((prev) => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  }, []);

  const getUserLikeData = useCallback(
    (userId: string, userLikes: number) => {
      const isLiked = likedUsers[userId] || false;
      return {
        isLiked,
        likesCount: isLiked ? userLikes + 1 : userLikes
      };
    },
    [likedUsers]
  );

  const { user, skillId, offerPreviewData, recommendedUsers, isNotFound } =
    useSkillPage(userId);

  const {
    handleOfferExchange,
    isModalOpen,
    closeModal,
    hasOffered,
    isLoading
  } = useExchangeSystem(skillId ?? '');

  if (isNotFound) {
    return (
      <main className={styles.page}>
        <section className={styles.section}>
          <div>Пользователь не найден</div>
        </section>
      </main>
    );
  }

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

          {offerPreviewData && (
            <OfferPreviewForSkillPage
              data={offerPreviewData}
              onExchangeClick={handleOfferExchange}
              isExchangeDisabled={!skillId || hasOffered}
              isLoading={isLoading}
            />
          )}
        </section>
        <CardsGallery
          users={recommendedUsers}
          onLike={handleLikeToggle}
          onMore={(id) => console.log('more', id)}
          getUserLikeData={getUserLikeData}
        />
      </div>
      <SuccessProposalModal isOpen={isModalOpen} onClose={closeModal} />
    </main>
  );
};
