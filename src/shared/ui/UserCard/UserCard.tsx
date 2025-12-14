import type { UserCardProps } from './type.ts';
import { memo } from 'react';
import clsx from 'clsx';
import styles from './UserCard.module.css';
import { Avatar, Tag, ButtonIcon, LinkButton } from '../index.ts';
import { getAgeEndingWord } from '../../lib/getAgeEndingWord.ts';
import type { TagCategory } from '../Tag/type.ts';

export const UserCard = memo(function UserCard({
  user,
  avatar,
  className,
  showLinkButton,
  onLike,
  onMore
}: UserCardProps) {
  // Проверяем значение avatarUrl
  console.log('user.avatarUrl:', user.avatarUrl);

  return (
    <li className={clsx(styles.userCard, className)}>
      {/* Блок с аватаркой, именем, городом и возрастом */}
      <div className={styles.userInfo}>
        <Avatar
          size={avatar?.size ?? 'medium'}
          className={avatar?.className}
          avatarUrl={user.avatarUrl}
          alt={user.name}
        />
        <div
          className={clsx(
            styles.userInfoDetails,
            !showLinkButton && styles.userInfoDetails_center
          )}
        >
          {showLinkButton && (
            <ButtonIcon
              name='likeEmpty'
              iconName='likeEmpty'
              onClick={() => onLike?.(user.id)}
            />
          )}
          <div className={styles.userDataWrapper}>
            <p className={styles.userName}>{user.name}</p>
            <p className={styles.userData}>
              {user.location || 'Город не найден'}, {user.age}{' '}
              {getAgeEndingWord(user.age)}
            </p>
          </div>
        </div>
      </div>

      {/* Короткое БИО */}
      {!showLinkButton && user.skillsTeach.length > 0 && (
        <div className={styles.userCardBio}>
          <p>{user.skillsTeach[0]?.shortDescription}</p>
        </div>
      )}

      {/* Навыки: может научить */}
      {user.skillsTeach.length > 0 && (
        <div className={styles.userSkillsWrapper}>
          <p className={styles.userSkillsHeader}>Может научить:</p>
          <div className={styles.userSkills}>
            {user.skillsTeach.map((skill, index) => (
              // Используем subcategoryId как ключ, так как id был удален
              <Tag
                key={skill.subcategoryId || `teach-${index}`}
                category={skill.categoryId as TagCategory}
              >
                {skill.name}
              </Tag>
            ))}
          </div>
        </div>
      )}

      {user.skillsLearn.length > 0 &&
        (() => {
          const maxVisible = 2;
          const visibleSkills = user.skillsLearn.slice(0, maxVisible);
          const hiddenCount = user.skillsLearn.length - visibleSkills.length;

          return (
            <div className={styles.userSkillsWrapper}>
              <p className={styles.userSkillsHeader}>Хочет научиться:</p>

              <div className={styles.userSkills}>
                {visibleSkills.map((skill, index) => (
                  <Tag
                    key={skill.subcategoryId || `learn-${index}`}
                    category={skill.categoryId as TagCategory}
                    className={styles.tag}
                  >
                    {skill.name}
                  </Tag>
                ))}

                {hiddenCount > 0 && (
                  <Tag category='default' className={styles.tagOverflow}>
                    {`+${hiddenCount}`}
                  </Tag>
                )}
              </div>
            </div>
          );
        })()}

      {/* Кнопка "Подробнее" */}
      {showLinkButton && (
        <LinkButton
          size='xl'
          style='primary'
          to='#'
          onClick={() => onMore?.(user.id)}
        >
          Подробнее
        </LinkButton>
      )}
    </li>
  );
});
