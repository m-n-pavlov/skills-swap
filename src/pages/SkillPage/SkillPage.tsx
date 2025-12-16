import styles from './SkillPage.module.css';
import { UserCard } from '../../shared/ui/UserCard';
import { OfferPreviewForSkillPage } from '../../widgets/OfferPreviewForSkillPage';
import { UserCardList } from '../../widgets/UserCardList';
import { useSkillPage } from '../../features/skills/useSkillPageResult.ts';

const userId = '2';

export const SkillPage = () => {
  const { user, offerPreviewData, recommendedUsers, isNotFound } =
    useSkillPage(userId);

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
            <OfferPreviewForSkillPage data={offerPreviewData} />
          )}
        </section>
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionName}>Похожие предложения</h2>
          </div>

          <UserCardList
            users={recommendedUsers}
            onLike={(id) => {
              console.log('like', id);
            }}
            onMore={(id) => {
              console.log('more', id);
            }}
          />
        </section>
      </div>
    </main>
  );
};
