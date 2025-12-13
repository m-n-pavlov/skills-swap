import styles from './HomePage.module.css';
import Filters from '../../shared/ui/Filters/Filters.tsx';
import { Button } from '../../shared/ui';
import { UserCardList } from '../../widgets/UserCardList';
import { useSelector } from 'react-redux';

import { useCallback, useRef } from 'react';
import { useInfiniteItems } from '../../shared/hooks';
import { useInfiniteScroll } from '../../shared/hooks/useInfiniteScroll';

import { selectAllCategories } from '../../app/store/slices/categoriesSlice/categoriesSelector.ts';
import { selectAllCities } from '../../app/store/slices/citiesSlice/citiesSelector.ts';
import { useUsersWithDetails } from '../../features/users';
import { useMemo } from 'react';
import { sortNewestUsers, sortPopularUsers } from '../../features/users';

export const HomePage = () => {
  const categories = useSelector(selectAllCategories); // передать в компонент Filters
  const cities = useSelector(selectAllCities); // передать в компонент Filters

  const usersWithDetails = useUsersWithDetails();

  // Инициализация пагинации для секции "Рекомендуем"
  const {
    currentItems: recommendedUsers,
    loadMore,
    hasMore
  } = useInfiniteItems(usersWithDetails, 20);

  // Создаем ref, который будет внизу списка
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const handleLoadMore = useCallback(() => {
    console.log('✅ Сработала пагинация');
    loadMore();
  }, [loadMore]);

  // Подключаем useInfiniteScroll
  useInfiniteScroll({
    targetRef: loadMoreRef,
    onIntersect: handleLoadMore,
    enabled: hasMore
  });

  const popularUsers = useMemo(
    () => sortPopularUsers(usersWithDetails),
    [usersWithDetails]
  );

  const newestUsers = useMemo(
    () => sortNewestUsers(usersWithDetails),
    [usersWithDetails]
  );

  return (
    /* --- Контейнер главной страницы, за исключением Header и Footer --- */
    <main className={styles.page}>
      {/* Блок с фильтрами */}
      <aside>
        <Filters categories={categories} cities={cities} />
      </aside>

      {/* Обертка для блока с секциями карточек */}
      <div className={styles.content}>
        {/* --- Секция "Популярное" --- */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionName}>Популярное</h2>
            <Button
              onClick={() => console.log('Button clicked')}
              style='tertiary'
              type='button'
              iconName='chevronRight'
              iconPosition='right'
              iconAlt='Смотреть все'
            >
              Смотреть все
            </Button>
          </div>
          <UserCardList
            users={popularUsers.slice(0, 3)}
            onLike={(id) => console.log('like', id)}
            onMore={(id) => console.log('more', id)}
          />
        </section>

        {/* --- Секция "Новое" --- */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionName}>Новое</h2>
            <Button
              onClick={() => console.log('Button clicked')}
              style='tertiary'
              type='button'
              iconName='chevronRight'
              iconPosition='right'
              iconAlt='Смотреть все'
            >
              Смотреть все
            </Button>
          </div>
          <UserCardList
            users={newestUsers.slice(0, 3)}
            onLike={(id) => console.log('like', id)}
            onMore={(id) => console.log('more', id)}
          />
        </section>

        {/* --- Секция "Рекомендуем" --- */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionName}>Рекомендуем</h2>
          </div>
          <UserCardList
            users={recommendedUsers}
            onLike={(id) => console.log('like', id)}
            onMore={(id) => console.log('more', id)}
          />
          {/* Sentinel-элемент для IntersectionObserver */}
          {hasMore && <div ref={loadMoreRef} />}
        </section>

        {/* --- Секция "Подходящие предложения" --- */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionName}>Подходящие предложения:</h2>
            <Button
              onClick={() => console.log('Button clicked')}
              style='tertiary'
              type='button'
              iconName='sort'
              iconPosition='left'
              iconAlt='Сначала новые'
            >
              Сначала новые
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
};
