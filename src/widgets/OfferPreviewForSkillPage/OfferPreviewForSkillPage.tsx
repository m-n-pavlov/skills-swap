import type { FC } from 'react';
import { OfferPreviewCard } from '../OfferPreviewCard/OfferPreviewCard';
import { ButtonIcon } from '../../shared/ui/ButtonIcon';
import { Button } from '../../shared/ui/Button';
import styles from './OfferPreviewForSkillPage.module.css';
import type { OfferPreviewForSkillPageProps } from './type';

interface ExtendedProps extends OfferPreviewForSkillPageProps {
  userLikes?: number;
  isUserLiked?: boolean;
  onUserLikeToggle?: () => void;
}

export const OfferPreviewForSkillPage: FC<ExtendedProps> = ({
  data,
  onExchangeClick,
  isExchangeDisabled,
  isLoading,
  userLikes = 0,
  isUserLiked = false,
  onUserLikeToggle
}) => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.iconsRow}>
        <div className={styles.userLikesContainer}>
          {userLikes > 0 && (
            <span className={styles.userLikesCount}>{userLikes}</span>
          )}
          <ButtonIcon
            name={isUserLiked ? 'Убрать лайк' : 'Поставить лайк'}
            iconName={isUserLiked ? 'like' : 'likeEmpty'}
            onClick={onUserLikeToggle}
            isLiked={isUserLiked}
          />
        </div>
        <ButtonIcon name='Поделиться' iconName='share' />
        <ButtonIcon name='Дополнительные действия' iconName='moreSquare' />
      </div>

      <OfferPreviewCard
        title={data.title}
        categoryPath={data.category}
        description={data.description}
        images={data.images}
        actions={
          <Button
            type='button'
            style='primary'
            className={styles.button}
            onClick={onExchangeClick}
            disabled={isExchangeDisabled || isLoading}
          >
            Предложить обмен
          </Button>
        }
      />
    </section>
  );
};
