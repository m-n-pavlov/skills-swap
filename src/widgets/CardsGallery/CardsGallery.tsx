import { UserCard } from '../../shared/ui/UserCard';
import type { CardsGalleryProps } from './type';
import { SwiperSlide, Swiper } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper/types';
import { ChevronButton } from '../../shared/ui/ChevronButton';
import { useEffect, useState } from 'react';

import styles from './CardsGallery.module.css';

export const CardsGallery = ({
  users,
  onLike,
  onMore,
  getUserLikeData
}: CardsGalleryProps) => {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    if (swiper) {
      const updateButtons = () => {
        setIsBeginning(swiper.isBeginning);
        setIsEnd(swiper.isEnd);
      };

      updateButtons();

      swiper.on('slideChange', updateButtons);

      return () => {
        swiper.off('slideChange', updateButtons);
      };
    }
  }, [swiper]);

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Похожие предложения</h2>
      <ul className={styles.wrap}>
        <Swiper
          slidesPerView={4}
          spaceBetween={24}
          modules={[FreeMode]}
          className={styles.slider}
          onSwiper={setSwiper}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          onInit={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
        >
          {users.map((user) => {
            const { isLiked, likesCount } = getUserLikeData(
              user.id,
              user.likes || 0
            );

            return (
              <SwiperSlide key={user.id}>
                <UserCard
                  user={user}
                  avatar={{ size: 'medium' }}
                  showLinkButton={true}
                  isLiked={isLiked}
                  likesCount={likesCount}
                  onLike={() => onLike(user.id)}
                  onMore={() => onMore(user.id)}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
        {!isBeginning && (
          <ChevronButton
            direction={'chevronLeft'}
            name={'Назад'}
            onClick={() => swiper?.slidePrev()}
            className={styles.chevronLeft}
          />
        )}
        {!isEnd && (
          <ChevronButton
            direction={'chevronRight'}
            name={'Далее'}
            onClick={() => swiper?.slideNext()}
            className={styles.chevronRight}
          />
        )}
      </ul>
    </section>
  );
};
