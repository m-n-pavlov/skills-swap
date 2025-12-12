import { memo } from 'react';
import type { UserCardListProps } from './type.ts';
import styles from './UserCardList.module.css';
import { UserCard } from '../../shared/ui/UserCard';

export const UserCardList = memo(function UserCardList({
  users,
  onLike,
  onMore
}: UserCardListProps) {
  return (
    <ul className={styles.userCardList}>
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          avatar={{ size: 'medium' }} // теперь только размер, URL берется из user.avatarUrl
          showLinkButton={true}
          className={styles.userCardItem}
          onLike={onLike}
          onMore={onMore}
        />
      ))}
    </ul>
  );
});
