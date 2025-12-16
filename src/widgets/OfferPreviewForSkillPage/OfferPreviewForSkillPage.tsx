import type { FC } from 'react';
import { OfferPreviewCard } from '../OfferPreviewCard/OfferPreviewCard';
import { ButtonIcon } from '../../shared/ui/ButtonIcon';
import { Button } from '../../shared/ui/Button';
import styles from './OfferPreviewForSkillPage.module.css';
import type { OfferPreviewForSkillPageProps } from './type';

export const OfferPreviewForSkillPage: FC<OfferPreviewForSkillPageProps> = ({
  data,
  onExchangeClick,
  isExchangeDisabled,
  isLoading
}) => {
  return (
    <section className={styles.wrapper}>
      {/* ряд иконок сверху справа */}
      <div className={styles.iconsRow}>
        <ButtonIcon name='Добавить в избранное' iconName='likeEmpty' />
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
