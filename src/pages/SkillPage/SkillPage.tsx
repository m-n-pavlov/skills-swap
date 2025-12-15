import styles from './SkillPage.module.css';
import { UserCard } from '../../shared/ui/UserCard';
import { useUsersWithDetails } from '../../features/users';
import {
  type OfferPreviewData,
  OfferPreviewForSkillPage
} from '../../widgets/OfferPreviewForSkillPage';
import { UserCardList } from '../../widgets/UserCardList';

export const SkillPage = () => {
  const userId = '2';
  const usersWithDetails = useUsersWithDetails();
  const user = usersWithDetails.find((u) => u.id === userId);

  if (!user) {
    return (
      <main className={styles.page}>
        <section className={styles.section}>
          <div>Пользователь не найден</div>
        </section>
      </main>
    );
  }

  const previewSkill = user.skillsTeach[0];
  const similarUsers = usersWithDetails.filter((otherUser) => {
    if (otherUser.id === userId) return false;
    return otherUser.skillsTeach.some(
      (skill) => skill.name === previewSkill.name
    );
  });

  const offerPreviewData: OfferPreviewData = {
    title: previewSkill.name || `${user.name} предлагает научить`,
    category: previewSkill.categoryId || 'Обучение',
    description:
      previewSkill.description ||
      `${user.name} готов поделиться своими знаниями`,
    images: previewSkill.images || []
  };

  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <section className={styles.preview_skill}>
          <UserCard
            key={user.id}
            user={user}
            avatar={{ size: 'medium' }}
            showLinkButton={false}
            className={styles.userCardItem}
          />

          <OfferPreviewForSkillPage data={offerPreviewData} />
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionName}>Похожие предложения</h2>
          </div>

          <UserCardList
            users={similarUsers.slice(0, 4)}
            onLike={(id) => console.log('like', id)}
            onMore={(id) => console.log('more', id)}
          />
        </section>
      </div>
    </main>
  );
};
