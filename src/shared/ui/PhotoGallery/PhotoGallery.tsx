import { useEffect, useMemo, useState } from 'react';
import { FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper/types';
import type { PhotoGalleryProps } from './type';
import { ChevronButton } from '../ChevronButton';

import styles from './PhotoGallery.module.css';

export const PhotoGallery = ({ images }: PhotoGalleryProps) => {
  const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleStart, setVisibleStart] = useState(0);

  const displayedMiniImages = useMemo(
    () => images.slice(visibleStart, visibleStart + 3),
    [images, visibleStart]
  );
  const extraImagesCount = Math.max(
    0,
    images.length - (visibleStart + displayedMiniImages.length)
  );

  useEffect(() => {
    const maxStart = Math.max(0, images.length - 3);
    const desiredStart = Math.min(Math.max(activeIndex - 1, 0), maxStart);

    if (desiredStart !== visibleStart) {
      setVisibleStart(desiredStart);
    }
  }, [activeIndex, images.length, visibleStart]);

  return (
    <section className={styles.gallery}>
      <div className={styles.wrap}>
        <Swiper
          slidesPerView={1}
          modules={[FreeMode]}
          onSwiper={(swiperInstance) => {
            setMainSwiper(swiperInstance);
            setActiveIndex(swiperInstance.activeIndex ?? 0);
          }}
          className={styles.main}
          initialSlide={0}
          onSlideChange={(swiperInstance) =>
            setActiveIndex(swiperInstance.activeIndex ?? 0)
          }
        >
          {images.map((image, index) => (
            <SwiperSlide key={`main-${index}`} className={styles.slide}>
              <img
                className={styles.img}
                src={image}
                alt='Фото навыка'
                loading='lazy'
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <ChevronButton
          direction={'chevronLeft'}
          name={'Назад'}
          onClick={() => mainSwiper?.slidePrev()}
        />
        <ChevronButton
          direction={'chevronRight'}
          name={'Далее'}
          onClick={() => mainSwiper?.slideNext()}
        />
      </div>

      <Swiper modules={[FreeMode]} direction='vertical' className={styles.mini}>
        {displayedMiniImages.map((image, index) => {
          const imageIndex = visibleStart + index;
          const isActive = activeIndex === imageIndex;

          return (
            <SwiperSlide
              key={`mini-${imageIndex}`}
              className={`${styles.miniSlide} ${isActive ? styles.miniSlideActive : ''}`}
              onClick={() => mainSwiper?.slideTo(imageIndex)}
            >
              <img className={styles.img} src={image} alt='Фото навыка' />
              {index === displayedMiniImages.length - 1 &&
                extraImagesCount > 0 && (
                  <span className={styles.more}>+ {extraImagesCount}</span>
                )}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};
