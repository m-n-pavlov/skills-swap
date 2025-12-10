import SkillsFilter from './SkillsFilter/SkillsFilter.tsx';
import FilterCities from './CitesFilter/CitiesFilter.tsx';
import TypeFilter from './TypeFilter/TypeFilter.tsx';
import GenderFilter from './GenderFilter/GenderFilter.tsx';
import styles from './Filters.module.css';
import { memo, useEffect, useState } from 'react';
import { Icon } from '../Icon';
import type { FiltersState, TFilters } from './type.ts';

const Filters = ({ categories, cities, onFiltersChange }: TFilters) => {
  const [filters, setFilters] = useState<FiltersState>({
    type: 'all',
    skills: [], // массив выбранных подкатегорий
    gender: 'any',
    cities: []
  });
  // Обработчики для каждого типа фильтра
  const handleTypeChange = (type: string): void => {
    setFilters((prev) => ({ ...prev, type }));
  };

  const handleSkillsChange = (skills: string[]): void => {
    setFilters((prev) => ({ ...prev, skills }));
  };

  const handleGenderChange = (gender: string) => {
    setFilters((prev) => ({ ...prev, gender }));
  };

  const handleCitiesChange = (cities: string[]) => {
    setFilters((prev) => ({ ...prev, cities }));
  };

  // Функция для сброса всех фильтров
  const handleResetFilters = () => {
    setFilters({
      type: 'all',
      skills: [],
      gender: 'any',
      cities: []
    });
  };

  // Передаём фильтры наверх
  useEffect(() => {
    onFiltersChange?.(filters);
  }, [filters]);
  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.type !== 'all') count++;
    if (filters.gender !== 'any') count++;
    count += filters.skills.length;
    count += filters.cities.length;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();
  return (
    <aside className={styles.wrapper}>
      <div className={styles.header}>
        <h3 className={styles.title}>
          Фильтры
          {activeFiltersCount > 0 && <span> ({activeFiltersCount})</span>}
        </h3>
        {activeFiltersCount > 0 && (
          <button onClick={handleResetFilters} className={styles.buttonReset}>
            Сбросить
            <Icon name={'cross'} alt={'cross'} />
          </button>
        )}
      </div>
      <div className={styles.filters}>
        <TypeFilter value={filters.type} onChange={handleTypeChange} />
        <SkillsFilter
          categories={categories}
          selectedSkills={filters.skills}
          onChange={handleSkillsChange}
        />
        <GenderFilter value={filters.gender} onChange={handleGenderChange} />
        <FilterCities
          cities={cities}
          selectedCities={filters.cities}
          onChange={handleCitiesChange}
        />
      </div>
    </aside>
  );
};

export default memo(Filters);
