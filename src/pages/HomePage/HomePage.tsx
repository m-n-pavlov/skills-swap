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
import { setSearchQuery } from '../../app/store/slices/filtersSlice/filtersSlice';
import { useNavigate } from 'react-router-dom';

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
  const getLinkButtonIconName = 'clock';

  const searchQuery = useSelector(selectSearchQuery);

  const [filters, setFilters] = useState<FiltersState>({
    type: 'any',
    skillIds: [],
    gender: 'any',
    cityIds: []
  });

  const [activeFilters, setActiveFilters] = useState<ActiveFilter[]>([]);

  const [activeSection, setActiveSection] = useState<SectionType | null>(null);

  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

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

  useEffect(() => {
    if (!searchQuery.trim()) {
      if (filters.skillIds.length > 0) {
        setFilters((prev) => ({ ...prev, skillIds: [] }));
      }
      return;
    }

    const allSkills = categories.flatMap((c) => c.subCategories);
    const matchingSkills = allSkills.filter((skill) =>
      skill.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (matchingSkills.length > 0) {
      const firstMatchingSkill = matchingSkills[0];

      setFilters((prev) => ({
        ...prev,
        skillIds: [firstMatchingSkill.id]
      }));

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

      setActiveSection(null);
    }
  }, [searchQuery, categories]);

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
    setActiveFilters((prev) => prev.filter((filter) => filter.id !== id));
  }, []);

  const getLinkButtonActionType = useCallback(
    (userId: string): 'navigate' | 'tradeStatus' => {
      if (!currentUser) return 'navigate';
      const hasExchangeOffer = currentUser.exchangeOffers?.includes(userId);
      return hasExchangeOffer ? 'tradeStatus' : 'navigate';
    },
    [currentUser]
  );

  const handleFiltersChange = useCallback(
    (newFilters: FiltersState) => {
      setFilters(newFilters);

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
    },
    [categories, cities]
  );

  const handleResetFilters = useCallback(() => {
    setFilters({
      type: 'any',
      skillIds: [],
      gender: 'any',
      cityIds: []
    });
    setActiveFilters((prev) => prev.filter((f) => f.type === 'section'));
  }, []);

  const handleRemoveFilter = useCallback(
    (filter: ActiveFilter) => {
      removeActiveFilter(filter.id);

      if (filter.type === 'section') {
        setActiveSection(null);
      } else if (filter.filterType === 'type') {
        setFilters((prev) => ({ ...prev, type: 'any' }));
      } else if (filter.filterType === 'skill') {
        setFilters((prev) => ({
          ...prev,
          skillIds: prev.skillIds.filter((id) => id !== filter.value)
        }));
        dispatch(setSearchQuery(''));
      } else if (filter.filterType === 'gender') {
        setFilters((prev) => ({ ...prev, gender: 'any' }));
      } else if (filter.filterType === 'city') {
        setFilters((prev) => ({
          ...prev,
          cityIds: prev.cityIds.filter((id) => id !== filter.value)
        }));
      }
    },
    [removeActiveFilter, dispatch]
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
  }, []);

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

  const handleSortToggle = useCallback(() => {
    setSortOrder((prev) => (prev === 'newest' ? 'oldest' : 'newest'));
  }, []);

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

  const getUsersToShow = useCallback(() => {
    if (activeSection === 'popular') {
      return usersWithDetails;
    } else if (activeSection === 'newest') {
      return usersWithDetails;
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

  const filteredUsers = useMemo(() => getUsersToShow(), [getUsersToShow]);

  const sortedFilteredUsers = useMemo(() => {
    let users = [...filteredUsers];

    if (activeSection === 'popular') {
      return sortPopularUsers(users);
    }

    if (activeSection === 'newest') {
      return sortNewestUsers(users);
    }

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

  const sortButtonText =
    sortOrder === 'newest' ? 'Сначала старые' : 'Сначала новые';

  const shouldShowRegularSections = useMemo(() => {
    return activeFilters.length === 0 && !activeSection;
  }, [activeFilters.length, activeSection]);

  const handleLoadMore = useCallback(() => {
    console.log('✅ Сработала пагинация');
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
                linkButtonActionType={getLinkButtonActionType}
                linkButtonIconName={getLinkButtonIconName}
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
                linkButtonActionType={getLinkButtonActionType}
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
                linkButtonActionType={getLinkButtonActionType}
                linkButtonIconName={getLinkButtonIconName}
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
                onLike={handleLikeToggle}
                onMore={handleNavigationSkill}
                getUserLikeData={getUserLikeData}
                linkButtonActionType={getLinkButtonActionType}
                linkButtonIconName={getLinkButtonIconName}
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
