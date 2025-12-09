import { memo } from 'react';
import { UserCard } from '../../shared/ui/UserCard';
import styles from './UserCardList.module.css';
import type { UserCardListProps } from './type.ts';

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
          avatar={{
            size: 'medium',
            alt: user.name
          }}
          showLinkButton={true}
          className={styles.userCardItem}
          onLike={onLike}
          onMore={onMore}
        />
      ))}
    </ul>
  );
});
