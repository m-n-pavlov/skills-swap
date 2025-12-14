// Импорт хуков React
import { useCallback, useRef, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

// Импорт стилей
import styles from './HomePage.module.css';

// Импорт используемых компонентов:
import Filters, {
  type FiltersState
} from '../../shared/ui/Filters/Filters.tsx'; // компонент блока с фильтрами

import { Button } from '../../shared/ui'; // компонент кнопки "Смотреть все"
import { UserCardList } from '../../widgets/UserCardList'; // импорт контейнера с карточками UserCardList

// Импорт хуков для пагинации
import { useInfiniteItems } from '../../shared/hooks';
import { useInfiniteScroll } from '../../shared/hooks/useInfiniteScroll';

// Импорт селекторов для получения всех категорий и городов из Redux-слайса для компонента блока с фильтрами
import { selectAllCategories } from '../../app/store/slices/categoriesSlice/categoriesSelector.ts';
import { selectAllCities } from '../../app/store/slices/citiesSlice/citiesSelector.ts';

// Импорт селектора для получения пользователей с дополнительными деталями
import { useUsersWithDetails } from '../../features/users';

// Функции для сортировки пользователей по новизне и популярности
import { sortNewestUsers, sortPopularUsers } from '../../features/users';

// Тип для порядка сортировки
type SortOrder = 'newest' | 'oldest';

// Компонент главной страницы
export const HomePage = () => {
  const categories = useSelector(selectAllCategories);
  const cities = useSelector(selectAllCities);
  const usersWithDetails = useUsersWithDetails();

  // Состояние для фильтров
  const [filters, setFilters] = useState<FiltersState>({
    type: 'any',
    skillIds: [],
    gender: 'any',
    cityIds: []
  });

  // Состояние для порядка сортировки в секции "Подходящие предложения"
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');

  // Состояния для отображения всех карточек в секциях
  const [showAllPopular, setShowAllPopular] = useState(false);
  const [showAllNewest, setShowAllNewest] = useState(false);

  // Обработчик изменения фильтров
  const handleFiltersChange = useCallback((newFilters: FiltersState) => {
    setFilters(newFilters);
  }, []);

  // Обработчик переключения порядка сортировки
  const handleSortToggle = useCallback(() => {
    setSortOrder((prev) => (prev === 'newest' ? 'oldest' : 'newest'));
  }, []);

  // Функция для фильтрации пользователей по выбранным фильтрам
  const filterUsersByFilters = useCallback(
    (users: typeof usersWithDetails, filters: FiltersState) => {
      return users.filter((user) => {
        // Фильтр по типу (learn/teach/any)
        if (filters.type !== 'any') {
          if (filters.type === 'learn') {
            // Для типа 'learn' проверяем, что у пользователя есть выбранные навыки в skillsLearn
            if (filters.skillIds.length > 0) {
              const userLearnSkillIds = user.skillsLearn.map(
                (skill) => skill.subcategoryId
              );
              const hasMatchingLearnSkills = filters.skillIds.some((skillId) =>
                userLearnSkillIds.includes(skillId)
              );
              if (!hasMatchingLearnSkills) return false;
            } else {
              // Если навыки не выбраны, проверяем, что вообще есть навыки в skillsLearn
              if (user.skillsLearn.length === 0) return false;
            }
          } else if (filters.type === 'teach') {
            // Для типа 'teach' проверяем, что у пользователя есть выбранные навыки в skillsTeach
            if (filters.skillIds.length > 0) {
              const userTeachSkillIds = user.skillsTeach.map(
                (skill) => skill.subcategoryId
              );
              const hasMatchingTeachSkills = filters.skillIds.some((skillId) =>
                userTeachSkillIds.includes(skillId)
              );
              if (!hasMatchingTeachSkills) return false;
            } else {
              // Если навыки не выбраны, проверяем, что вообще есть навыки в skillsTeach
              if (user.skillsTeach.length === 0) return false;
            }
          }
        }

        // Фильтр по полу
        if (filters.gender !== 'any' && user.gender !== filters.gender) {
          return false;
        }

        // Фильтр по городам
        if (
          filters.cityIds.length > 0 &&
          !filters.cityIds.includes(user.cityId)
        ) {
          return false;
        }

        // Фильтр по навыкам (общий для всех случаев)
        if (filters.skillIds.length > 0) {
          // Проверяем навыки в обеих категориях, если тип 'any'
          // Или в конкретной категории, если тип уже учтен выше
          const userAllSkills = [
            ...user.skillsTeach.map((skill) => skill.subcategoryId),
            ...user.skillsLearn.map((skill) => skill.subcategoryId)
          ];

          const hasMatchingSkill = filters.skillIds.some((skillId) =>
            userAllSkills.includes(skillId)
          );

          if (!hasMatchingSkill) return false;
        }

        return true;
      });
    },
    []
  );

  // Отфильтрованные пользователи для секции "Подходящие предложения"
  const filteredUsers = useMemo(() => {
    return filterUsersByFilters(usersWithDetails, filters);
  }, [usersWithDetails, filters, filterUsersByFilters]);

  // Сортировка отфильтрованных пользователей в зависимости от порядка сортировки
  const sortedFilteredUsers = useMemo(() => {
    const users = [...filteredUsers];

    if (sortOrder === 'newest') {
      // От новых к старым
      return users.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else {
      // От старых к новым
      return users.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    }
  }, [filteredUsers, sortOrder]);

  // Текст для кнопки сортировки
  const sortButtonText =
    sortOrder === 'newest' ? 'Сначала старые' : 'Сначала новые';

  // Проверяем, есть ли активные фильтры
  const hasActiveFilters = useMemo(() => {
    return (
      filters.type !== 'any' ||
      filters.gender !== 'any' ||
      filters.skillIds.length > 0 ||
      filters.cityIds.length > 0
    );
  }, [filters]);

  // Инициализация пагинации для секции "Рекомендуем"
  const {
    currentItems: recommendedUsers,
    loadMore,
    hasMore
  } = useInfiniteItems(usersWithDetails, 20);

  // Создаем ref (указатель на элемент, по которому срабатывает триггер)
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // Функция-обработчик подгрузки данных, которая срабатывает при достижении триггера
  const handleLoadMore = useCallback(() => {
    console.log('✅ Сработала пагинация');
    loadMore();
  }, [loadMore]);

  // Подключаем хук для реализации бесконечной прокрутки
  useInfiniteScroll({
    targetRef: loadMoreRef,
    onIntersect: handleLoadMore,
    enabled: hasMore
  });

  // Мемоизированный массив пользователей, отсортированных по популярности
  const popularUsers = useMemo(
    () => sortPopularUsers(usersWithDetails),
    [usersWithDetails]
  );

  // Мемоизированный массив пользователей, отсортированных по новизне
  const newestUsers = useMemo(
    () => sortNewestUsers(usersWithDetails),
    [usersWithDetails]
  );

  // Обработчики для кнопок "Смотреть все"
  const handleShowAllPopular = useCallback(() => {
    setShowAllPopular(true);
  }, []);

  const handleShowAllNewest = useCallback(() => {
    setShowAllNewest(true);
  }, []);

  return (
    <main className={styles.page}>
      {/* Компонент блока с фильтрами */}
      <aside>
        <Filters
          categories={categories}
          cities={cities}
          onFiltersChange={handleFiltersChange}
        />
      </aside>

      <div className={styles.content}>
        {/* Показываем обычные секции только если нет активных фильтров */}
        {!hasActiveFilters ? (
          <>
            {/* Секция "Популярное" */}
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionName}>Популярное</h2>
                {!showAllPopular && (
                  <Button
                    onClick={handleShowAllPopular}
                    style='tertiary'
                    type='button'
                    iconName='chevronRight'
                    iconPosition='right'
                    iconAlt='Смотреть все'
                  >
                    Смотреть все
                  </Button>
                )}
              </div>
              <UserCardList
                users={showAllPopular ? popularUsers : popularUsers.slice(0, 3)} // показываем все или только 3
                onLike={(id) => console.log('like', id)}
                onMore={(id) => console.log('more', id)}
              />
            </section>

            {/* Секция "Новое" */}
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionName}>Новое</h2>
                {!showAllNewest && (
                  <Button
                    onClick={handleShowAllNewest}
                    style='tertiary'
                    type='button'
                    iconName='chevronRight'
                    iconPosition='right'
                    iconAlt='Смотреть все'
                  >
                    Смотреть все
                  </Button>
                )}
              </div>
              <UserCardList
                users={showAllNewest ? newestUsers : newestUsers.slice(0, 3)} // показываем все или только 3
                onLike={(id) => console.log('like', id)}
                onMore={(id) => console.log('more', id)}
              />
            </section>

            {/* Секция "Рекомендуем" */}
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionName}>Рекомендуем</h2>
              </div>
              <UserCardList
                users={recommendedUsers} // все карточки
                onLike={(id) => console.log('like', id)}
                onMore={(id) => console.log('more', id)}
              />
              {/* Триггер для загрузки следующей порции элементов при сколле для IntersectionObserver */}
              {hasMore && <div ref={loadMoreRef} />}
            </section>
          </>
        ) : (
          // Секция "Подходящие предложения" - показываем только при активных фильтрах
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionName}>
                Подходящие предложения: {sortedFilteredUsers.length}
              </h2>
              <Button
                onClick={handleSortToggle}
                style='tertiary'
                type='button'
                iconName='sort'
                iconPosition='left'
                iconAlt={sortButtonText}
              >
                {sortButtonText}
              </Button>
            </div>
            {sortedFilteredUsers.length > 0 ? (
              <UserCardList
                users={sortedFilteredUsers}
                onLike={(id) => console.log('like', id)}
                onMore={(id) => console.log('more', id)}
              />
            ) : (
              <div className={styles.noResults}>
                <p>По выбранным фильтрам ничего не найдено</p>
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
};

export default HomePage;
