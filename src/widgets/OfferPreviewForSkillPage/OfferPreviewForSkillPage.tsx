import type { FC } from 'react';
import { OfferPreviewCard } from '../OfferPreviewCard/OfferPreviewCard';
import { ButtonIcon } from '../../shared/ui/ButtonIcon';
import { Button } from '../../shared/ui/Button';
import styles from './OfferPreviewForSkillPage.module.css';
import type { OfferPreviewForSkillPageProps } from './type';

// Обновляем типы для компонента
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
  userLikes = 0, // Количество лайков пользователя
  isUserLiked = false, // Лайкнул ли текущий пользователь
  onUserLikeToggle // Обработчик лайка пользователя
}) => {
  return (
    <section className={styles.wrapper}>
      {/* ряд иконок сверху справа */}
      <div className={styles.iconsRow}>
        {/* Блок с лайками пользователя */}
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

      {/* сама карточка */}
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
