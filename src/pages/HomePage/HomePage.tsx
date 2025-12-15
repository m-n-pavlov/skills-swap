import { useCallback, useRef, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './HomePage.module.css';
import Filters from '../../shared/ui/Filters/Filters.tsx';
import { Button } from '../../shared/ui';
import { UserCardList } from '../../widgets/UserCardList';
import { FilterChip } from '../../shared/ui';
import { useInfiniteItems } from '../../shared/hooks';
import { useInfiniteScroll } from '../../shared/hooks/useInfiniteScroll';
import { selectAllCategories } from '../../app/store/slices/categoriesSlice/categoriesSelector.ts';
import { selectAllCities } from '../../app/store/slices/citiesSlice/citiesSelector.ts';
import { useUsersWithDetails } from '../../features/users';
import { sortNewestUsers, sortPopularUsers } from '../../features/users';

export type ModeFilter = 'any' | 'learn' | 'teach';
export type GenderFilter = 'any' | 'male' | 'female';

export interface FiltersState {
  type: ModeFilter;
  skillIds: string[];
  gender: GenderFilter;
  cityIds: string[];
}

// Новые типы для управления активными фильтрами и чипсами
export type SectionType = 'popular' | 'newest' | 'recommended';

export interface ActiveFilter {
  id: string;
  type: 'section' | 'filter';
  filterType?: 'type' | 'skill' | 'gender' | 'city' | 'section';
  value: string;
  label: string;
  section?: SectionType;
}

export const HomePage = () => {
  const categories = useSelector(selectAllCategories);
  const cities = useSelector(selectAllCities);
  const usersWithDetails = useUsersWithDetails();

  // Состояние фильтров
  const [filters, setFilters] = useState<FiltersState>({
    type: 'any',
    skillIds: [],
    gender: 'any',
    cityIds: []
  });

  // Состояние активных фильтров (чипсов)
  const [activeFilters, setActiveFilters] = useState<ActiveFilter[]>([]);

  // Состояние активной секции
  const [activeSection, setActiveSection] = useState<SectionType | null>(null);

  // Состояние для порядка сортировки
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  // Инициализация пагинации
  const {
    currentItems: recommendedUsers,
    loadMore,
    hasMore
  } = useInfiniteItems(usersWithDetails, 20);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // Генерация ID для фильтров
  const generateId = () => Math.random().toString(36).substring(2);

  // Удаление фильтра по ID
  const removeActiveFilter = useCallback((id: string) => {
    setActiveFilters((prev) => prev.filter((filter) => filter.id !== id));
  }, []);

  // Обработчик изменения фильтров из компонента Filters
  const handleFiltersChange = useCallback(
    (newFilters: FiltersState) => {
      setFilters(newFilters);

      // Очищаем старые фильтры и добавляем новые
      const newActiveFilters: ActiveFilter[] = [];

      // Добавляем фильтр по типу
      if (newFilters.type !== 'any') {
        newActiveFilters.push({
          id: generateId(),
          type: 'filter',
          filterType: 'type',
          value: newFilters.type,
          label: newFilters.type === 'learn' ? 'Хочу научиться' : 'Могу научить'
        });
      }

      // Добавляем фильтры по навыкам
      newFilters.skillIds.forEach((skillId) => {
        const skill = categories
          .flatMap((c) => c.subCategories)
          .find((s) => s.id === skillId);
        if (skill) {
          newActiveFilters.push({
            id: generateId(),
            type: 'filter',
            filterType: 'skill',
            value: skillId,
            label: skill.name
          });
        }
      });

      // Добавляем фильтр по полу
      if (newFilters.gender !== 'any') {
        newActiveFilters.push({
          id: generateId(),
          type: 'filter',
          filterType: 'gender',
          value: newFilters.gender,
          label: newFilters.gender === 'male' ? 'Мужской' : 'Женский'
        });
      }

      // Добавляем фильтры по городам
      newFilters.cityIds.forEach((cityId) => {
        const city = cities.find((c) => c.id === cityId);
        if (city) {
          newActiveFilters.push({
            id: generateId(),
            type: 'filter',
            filterType: 'city',
            value: cityId,
            label: city.location
          });
        }
      });

      // Устанавливаем активные фильтры
      setActiveFilters((prev) => {
        // Сохраняем фильтры секций
        const sectionFilters = prev.filter((f) => f.type === 'section');
        return [...sectionFilters, ...newActiveFilters];
      });

      // Если есть фильтры, показываем секцию "Подходящие предложения"
      if (newActiveFilters.length > 0) {
        setActiveSection(null);
      }
    },
    [categories, cities]
  );

  // Обработчик сброса всех фильтров
  const handleResetFilters = useCallback(() => {
    setFilters({
      type: 'any',
      skillIds: [],
      gender: 'any',
      cityIds: []
    });
    setActiveFilters((prev) => prev.filter((f) => f.type === 'section'));
  }, []);

  // Обработчик удаления чипса
  const handleRemoveFilter = useCallback(
    (filter: ActiveFilter) => {
      removeActiveFilter(filter.id);

      if (filter.type === 'section') {
        // Если удаляем фильтр секции, скрываем секцию
        setActiveSection(null);
      } else if (filter.filterType === 'type') {
        setFilters((prev) => ({ ...prev, type: 'any' }));
      } else if (filter.filterType === 'skill') {
        setFilters((prev) => ({
          ...prev,
          skillIds: prev.skillIds.filter((id) => id !== filter.value)
        }));
      } else if (filter.filterType === 'gender') {
        setFilters((prev) => ({ ...prev, gender: 'any' }));
      } else if (filter.filterType === 'city') {
        setFilters((prev) => ({
          ...prev,
          cityIds: prev.cityIds.filter((id) => id !== filter.value)
        }));
      }
    },
    [removeActiveFilter]
  );

  // Обработчик "Смотреть все" для популярного
  const handleShowAllPopular = useCallback(() => {
    setActiveFilters((prev) => [
      ...prev.filter((f) => !(f.type === 'section' && f.section === 'popular')),
      {
        id: generateId(),
        type: 'section',
        filterType: 'section',
        value: 'popular',
        label: 'Популярное',
        section: 'popular'
      }
    ]);
    setActiveSection('popular');
  }, []);

  // Обработчик "Смотреть все" для нового
  const handleShowAllNewest = useCallback(() => {
    setActiveFilters((prev) => [
      ...prev.filter((f) => !(f.type === 'section' && f.section === 'newest')),
      {
        id: generateId(),
        type: 'section',
        filterType: 'section',
        value: 'newest',
        label: 'Новое',
        section: 'newest'
      }
    ]);
    setActiveSection('newest');
  }, []);

  // Обработчик переключения порядка сортировки
  const handleSortToggle = useCallback(() => {
    setSortOrder((prev) => (prev === 'newest' ? 'oldest' : 'newest'));
  }, []);

  // Функция для фильтрации пользователей
  const filterUsersByFilters = useCallback(
    (users: typeof usersWithDetails, filters: FiltersState) => {
      return users.filter((user) => {
        if (filters.type !== 'any') {
          if (filters.type === 'learn') {
            if (filters.skillIds.length > 0) {
              const userLearnSkillIds = user.skillsLearn.map(
                (skill) => skill.subcategoryId
              );
              const hasMatchingLearnSkills = filters.skillIds.some((skillId) =>
                userLearnSkillIds.includes(skillId)
              );
              if (!hasMatchingLearnSkills) return false;
            } else {
              if (user.skillsLearn.length === 0) return false;
            }
          } else if (filters.type === 'teach') {
            if (filters.skillIds.length > 0) {
              const userTeachSkillIds = user.skillsTeach.map(
                (skill) => skill.subcategoryId
              );
              const hasMatchingTeachSkills = filters.skillIds.some((skillId) =>
                userTeachSkillIds.includes(skillId)
              );
              if (!hasMatchingTeachSkills) return false;
            } else {
              if (user.skillsTeach.length === 0) return false;
            }
          }
        }

        if (filters.gender !== 'any' && user.gender !== filters.gender) {
          return false;
        }

        if (
          filters.cityIds.length > 0 &&
          !filters.cityIds.includes(user.cityId)
        ) {
          return false;
        }

        if (filters.skillIds.length > 0) {
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

  // Получаем пользователей для отображения - без сортировки
  const getUsersToShow = useCallback(() => {
    if (activeSection === 'popular') {
      return usersWithDetails; // Возвращаем всех пользователей, сортировка будет в sortedFilteredUsers
    } else if (activeSection === 'newest') {
      return usersWithDetails; // Возвращаем всех пользователей, сортировка будет в sortedFilteredUsers
    } else if (activeFilters.some((f) => f.type === 'filter')) {
      return filterUsersByFilters(usersWithDetails, filters);
    }
    return [];
  }, [
    activeSection,
    activeFilters,
    usersWithDetails,
    filters,
    filterUsersByFilters
  ]);

  // Отфильтрованные пользователи
  const filteredUsers = useMemo(() => getUsersToShow(), [getUsersToShow]);

  // Сортировка отфильтрованных пользователей - с учетом типа секции
  const sortedFilteredUsers = useMemo(() => {
    let users = [...filteredUsers];

    // Если активна секция "Популярное" - сортируем по лайкам
    if (activeSection === 'popular') {
      return sortPopularUsers(users);
    }

    // Если активна секция "Новое" - сортируем по дате создания (новые к старым)
    if (activeSection === 'newest') {
      return sortNewestUsers(users);
    }

    // Для остальных случаев (фильтры) применяем сортировку по sortOrder
    if (sortOrder === 'newest') {
      return users.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else {
      return users.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    }
  }, [filteredUsers, sortOrder, activeSection]);

  // Текст для кнопки сортировки
  const sortButtonText =
    sortOrder === 'newest' ? 'Сначала старые' : 'Сначала новые';

  // Проверяем, нужно ли показывать обычные секции
  const shouldShowRegularSections = useMemo(() => {
    return activeFilters.length === 0 && !activeSection;
  }, [activeFilters.length, activeSection]);

  // Обработчик подгрузки данных
  const handleLoadMore = useCallback(() => {
    console.log('✅ Сработала пагинация');
    loadMore();
  }, [loadMore]);

  // Подключаем бесконечную прокрутку
  useInfiniteScroll({
    targetRef: loadMoreRef,
    onIntersect: handleLoadMore,
    enabled: hasMore
  });

  // Мемоизированные массивы
  const popularUsers = useMemo(
    () => sortPopularUsers(usersWithDetails),
    [usersWithDetails]
  );

  const newestUsers = useMemo(
    () => sortNewestUsers(usersWithDetails),
    [usersWithDetails]
  );

  return (
    <main className={styles.page}>
      {/* Компонент блока с фильтрами */}
      <aside>
        <Filters
          categories={categories}
          cities={cities}
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onResetFilters={handleResetFilters}
        />
      </aside>

      <div className={styles.content}>
        {/* Контейнер для чипсов */}
        {activeFilters.length > 0 && (
          <div className={styles.chipsContainer}>
            {activeFilters.map((filter) => (
              <FilterChip
                key={filter.id}
                label={filter.label}
                onRemove={() => handleRemoveFilter(filter)}
                className={styles.chip}
              />
            ))}
          </div>
        )}

        {/* Показываем обычные секции только если нет активных фильтров */}
        {shouldShowRegularSections ? (
          <>
            {/* Секция "Популярное" */}
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionName}>Популярное</h2>
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
              </div>
              <UserCardList
                users={popularUsers.slice(0, 3)}
                onLike={(id) => console.log('like', id)}
                onMore={(id) => console.log('more', id)}
              />
            </section>

            {/* Секция "Новое" */}
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionName}>Новое</h2>
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
              </div>
              <UserCardList
                users={newestUsers.slice(0, 3)}
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
                users={recommendedUsers}
                onLike={(id) => console.log('like', id)}
                onMore={(id) => console.log('more', id)}
              />
              {hasMore && <div ref={loadMoreRef} />}
            </section>
          </>
        ) : (
          // Секция "Подходящие предложения" - показываем при активных фильтрах
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionName}>
                {activeSection
                  ? activeSection === 'popular'
                    ? 'Популярное'
                    : 'Новое'
                  : `Подходящие предложения: ${sortedFilteredUsers.length}`}
              </h2>
              {!activeSection && sortedFilteredUsers.length > 0 && (
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
              )}
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
