import { useCallback, useRef, useMemo, useState, useEffect } from 'react';
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
import { selectCurrentUser } from '../../app/store/slices/authSlice/authSelector.ts';
import { toggleLike } from '../../app/store/slices/authSlice/authSlice';
import { useAppDispatch } from '../../shared/hooks';
import { selectSearchQuery } from '../../app/store/slices/filtersSlice/selectors';
import {
  setSkills,
  setCities,
  setGender,
  setMode,
  setSort,
  setSearchQuery,
  clearFilters
} from '../../app/store/slices/filtersSlice/filtersSlice';
import { useNavigate } from 'react-router-dom';

// Хук фильтрации (тот, который ты прислал)
import { useFilteredUsers } from '../../app/store/slices/filtersSlice/useFilteredUsers';

export type ModeFilter = 'any' | 'learn' | 'teach';
export type GenderFilter = 'any' | 'male' | 'female';

export interface FiltersState {
  type: ModeFilter;
  skillIds: string[];
  gender: GenderFilter;
  cityIds: string[];
}

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
  const dispatch = useAppDispatch();
  const categories = useSelector(selectAllCategories);
  const cities = useSelector(selectAllCities);
  const currentUser = useSelector(selectCurrentUser);
  const usersWithDetails = useUsersWithDetails();
  const navigate = useNavigate();

  // Redux filters (используем штатную ветку state.filters)
  const reduxFilters = useSelector((state: any) => state.filters);
  const searchQuery = useSelector(selectSearchQuery);

  // Локальное состояние фильтров для компонента Filters (синхронизируется с Redux)
  const [filters, setFiltersLocal] = useState<FiltersState>({
    type: (reduxFilters?.mode as ModeFilter) ?? 'any',
    skillIds: (reduxFilters?.skills as string[]) ?? [],
    gender: (reduxFilters?.gender as GenderFilter) ?? 'any',
    cityIds: (reduxFilters?.cities as string[]) ?? []
  });

  const [activeFilters, setActiveFilters] = useState<ActiveFilter[]>([]);
  const [activeSection, setActiveSection] = useState<SectionType | null>(null);

  // likedUsers — оптимистичный UI для лайков
  const [likedUsers, setLikedUsers] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (currentUser?.likes) {
      const initialLikedUsers: Record<string, boolean> = {};
      currentUser.likes.forEach((cardId: string) => {
        initialLikedUsers[cardId] = true;
      });
      setLikedUsers(initialLikedUsers);
    }
  }, [currentUser]);

  // Синхронизация локальных фильтров с Redux (если кто-то изменил фильтры извне)
  useEffect(() => {
    setFiltersLocal({
      type: (reduxFilters?.mode as ModeFilter) ?? 'any',
      skillIds: (reduxFilters?.skills as string[]) ?? [],
      gender: (reduxFilters?.gender as GenderFilter) ?? 'any',
      cityIds: (reduxFilters?.cities as string[]) ?? []
    });
  }, [reduxFilters]);

  // Эффект: обработка поискового запроса - ищем навык и ставим его в Redux
  useEffect(() => {
    if (!searchQuery || !searchQuery.trim()) {
      // если поиск пустой, очищаем навыки в локале и в Redux (если нужно)
      // не форсируем очистку Redux.skills — оставляем это на логику удаления чипса
      if (filters.skillIds.length > 0) {
        setFiltersLocal((prev) => ({ ...prev, skillIds: [] }));
      }
      return;
    }

    const allSkills = categories.flatMap((c) => c.subCategories);
    const matchingSkills = allSkills.filter((skill) =>
      skill.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (matchingSkills.length > 0) {
      const firstMatchingSkill = matchingSkills[0];

      // Обновляем локально
      setFiltersLocal((prev) => ({
        ...prev,
        skillIds: [firstMatchingSkill.id]
      }));

      // Добавляем чип
      setActiveFilters((prev) => {
        const filtered = prev.filter((f) => f.filterType !== 'skill');
        return [
          ...filtered,
          {
            id: generateId(),
            type: 'filter',
            filterType: 'skill',
            value: firstMatchingSkill.id,
            label: firstMatchingSkill.name
          }
        ];
      });

      // Ставим навык в Redux, чтобы useFilteredUsers увидел изменение
      dispatch(setSkills([firstMatchingSkill.id]));

      // Так же сохраняем сам поисковый запрос в Redux (если требуется)
      dispatch(setSearchQuery(searchQuery));

      setActiveSection(null);
    }
  }, [searchQuery, categories]); // eslint-disable-line react-hooks/exhaustive-deps

  const {
    currentItems: recommendedUsers,
    loadMore,
    hasMore
  } = useInfiniteItems(usersWithDetails, 20);

  const handleNavigationSkill = useCallback(
    (userId: string) => {
      navigate(`/skill/${userId}`);
    },
    [navigate]
  );

  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const generateId = () => Math.random().toString(36).substring(2);

  const removeActiveFilter = useCallback((id: string) => {
    setActiveFilters((prev) => prev.filter((f) => f.id !== id));
  }, []);

  // Обработчик изменения фильтров из компонента Filters:
  // обновляем локально UI (Filters) + диспатчим соответствующие actions в Redux
  const handleFiltersChange = useCallback(
    (newFilters: FiltersState) => {
      setFiltersLocal(newFilters);

      const newActiveFilters: ActiveFilter[] = [];

      if (newFilters.type !== 'any') {
        newActiveFilters.push({
          id: generateId(),
          type: 'filter',
          filterType: 'type',
          value: newFilters.type,
          label: newFilters.type === 'learn' ? 'Хочу научиться' : 'Могу научить'
        });
      }

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

      if (newFilters.gender !== 'any') {
        newActiveFilters.push({
          id: generateId(),
          type: 'filter',
          filterType: 'gender',
          value: newFilters.gender,
          label: newFilters.gender === 'male' ? 'Мужской' : 'Женский'
        });
      }

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

      setActiveFilters((prev) => {
        const sectionFilters = prev.filter((f) => f.type === 'section');
        return [...sectionFilters, ...newActiveFilters];
      });

      if (newActiveFilters.length > 0) {
        setActiveSection(null);
      }

      // Диспатчим в Redux — отдельными экшенами (slice предоставляет их)
      dispatch(setMode(newFilters.type as any));
      dispatch(setSkills(newFilters.skillIds));
      dispatch(setGender(newFilters.gender as any));
      dispatch(setCities(newFilters.cityIds));
      // Сортировка не трогаем здесь (оставляем как есть в Redux)
    },
    [categories, cities, dispatch]
  );

  const handleResetFilters = useCallback(() => {
    const defaultLocal: FiltersState = {
      type: 'any',
      skillIds: [],
      gender: 'any',
      cityIds: []
    };

    setFiltersLocal(defaultLocal);
    setActiveFilters((prev) => prev.filter((f) => f.type === 'section'));

    // Сбрасываем Redux-фильтры
    dispatch(clearFilters());
    // Сбрасываем глобальный поисковый селектор
    dispatch(setSearchQuery(''));
  }, [dispatch]);

  const handleRemoveFilter = useCallback(
    (filter: ActiveFilter) => {
      removeActiveFilter(filter.id);

      if (filter.type === 'section') {
        setActiveSection(null);
        return;
      }

      if (filter.filterType === 'type') {
        setFiltersLocal((prev) => ({ ...prev, type: 'any' }));
        dispatch(setMode('any'));
        return;
      }

      if (filter.filterType === 'skill') {
        setFiltersLocal((prev) => ({
          ...prev,
          skillIds: prev.skillIds.filter((id) => id !== filter.value)
        }));
        // Очищаем глобальный поиск при удалении фильтра навыка
        dispatch(setSearchQuery(''));
        // Обновляем Redux.skills
        dispatch(
          setSkills(
            (reduxFilters?.skills as string[] | undefined)?.filter(
              (id) => id !== filter.value
            ) ?? []
          )
        );
        return;
      }

      if (filter.filterType === 'gender') {
        setFiltersLocal((prev) => ({ ...prev, gender: 'any' }));
        dispatch(setGender('any'));
        return;
      }

      if (filter.filterType === 'city') {
        setFiltersLocal((prev) => ({
          ...prev,
          cityIds: prev.cityIds.filter((id) => id !== filter.value)
        }));
        dispatch(
          setCities(
            (reduxFilters?.cities as string[] | undefined)?.filter(
              (id) => id !== filter.value
            ) ?? []
          )
        );
        return;
      }
    },
    [removeActiveFilter, dispatch, reduxFilters]
  );

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

    // выставляем сортировку в Redux
    dispatch(setSort('popular'));
  }, [dispatch]);

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

    // выставляем сортировку в Redux
    dispatch(setSort('new'));
  }, [dispatch]);

  const handleSortToggle = useCallback(() => {
    const newSort = reduxFilters?.sort === 'new' ? null : 'new';
    dispatch(setSort(newSort));
  }, [dispatch, reduxFilters]);

  const handleLikeToggle = useCallback(
    async (cardId: string) => {
      if (!currentUser) {
        console.warn('Пользователь не авторизован');
        return;
      }

      const isCurrentlyLiked = likedUsers[cardId] || false;
      setLikedUsers((prev) => ({
        ...prev,
        [cardId]: !isCurrentlyLiked
      }));

      try {
        await dispatch(
          toggleLike({
            user: currentUser,
            cardId
          })
        ).unwrap();
      } catch (error) {
        setLikedUsers((prev) => ({
          ...prev,
          [cardId]: isCurrentlyLiked
        }));
        console.error('Ошибка при обновлении лайка:', error);
      }
    },
    [currentUser, likedUsers, dispatch]
  );

  const getUserLikeData = useCallback(
    (userId: string, userLikes: number) => {
      const isLiked = likedUsers[userId] || false;
      const likesCount = isLiked ? userLikes + 1 : userLikes;
      return {
        isLiked,
        likesCount
      };
    },
    [likedUsers]
  );

  const handleLoadMore = useCallback(() => {
    loadMore();
  }, [loadMore]);

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

  // Используем централизованный хук фильтрации (читает фильтры из Redux)
  const {
    filteredUsers: reduxFilteredUsers,
    usersFound,
    isEmpty
  } = useFilteredUsers(usersWithDetails);

  // Применяем сортировку к результатам фильтрации (если требуется)
  const displayedFilteredUsers = useMemo(() => {
    const users = [...reduxFilteredUsers];
    if (reduxFilters?.sort === 'new') {
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
  }, [reduxFilteredUsers, reduxFilters?.sort]);

  const sortButtonText =
    reduxFilters?.sort === 'new' ? 'Сначала старые' : 'Сначала новые';

  const shouldShowRegularSections = useMemo(() => {
    return activeFilters.length === 0 && !activeSection;
  }, [activeFilters.length, activeSection]);

  const shouldShowSortButton = !activeSection && !isEmpty;

  return (
    <main className={styles.page}>
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

        {shouldShowRegularSections ? (
          <>
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
                onLike={handleLikeToggle}
                onMore={handleNavigationSkill}
                getUserLikeData={getUserLikeData}
              />
            </section>

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
                onLike={handleLikeToggle}
                onMore={handleNavigationSkill}
                getUserLikeData={getUserLikeData}
              />
            </section>

            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionName}>Рекомендуем</h2>
              </div>
              <UserCardList
                users={recommendedUsers}
                onLike={handleLikeToggle}
                onMore={handleNavigationSkill}
                getUserLikeData={getUserLikeData}
              />
              {hasMore && <div ref={loadMoreRef} />}
            </section>
          </>
        ) : (
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionName}>
                {activeSection
                  ? activeSection === 'popular'
                    ? 'Популярное'
                    : 'Новое'
                  : `Подходящие предложения: ${usersFound}`}
              </h2>

              {shouldShowSortButton && (
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

            {displayedFilteredUsers.length > 0 ? (
              <UserCardList
                users={displayedFilteredUsers}
                onLike={handleLikeToggle}
                onMore={handleNavigationSkill}
                getUserLikeData={getUserLikeData}
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
