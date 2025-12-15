import { memo } from 'react';
import type { UserCardListProps } from './type.ts';
import styles from './UserCardList.module.css';
import { UserCard } from '../../shared/ui/UserCard';

export const UserCardList = memo(function UserCardList({
  users,
  onLike,
  onMore,
  getUserLikeData
}: UserCardListProps) {
  return (
    <ul className={styles.userCardList}>
      {users.map((user) => {
        const likeData = getUserLikeData(user.id, user.likes || 0);
        return (
          <UserCard
            key={user.id}
            user={user}
            avatar={{ size: 'medium' }}
            showLinkButton={true}
            className={styles.userCardItem}
            onLike={onLike}
            onMore={onMore}
            isLiked={likeData.isLiked}
            likesCount={likeData.likesCount}
          />
        );
      })}
    </ul>
  );
});
