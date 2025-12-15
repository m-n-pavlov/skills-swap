import SkillsFilter from './SkillsFilter/SkillsFilter.tsx';
import CitiesFilter from './CitiesFilter/CitiesFilter.tsx';
import TypeFilter from './TypeFilter/TypeFilter.tsx';
import GenderFilter from './GenderFilter/GenderFilter.tsx';
import styles from './Filters.module.css';
import { memo } from 'react';
import { Icon } from '../Icon';

export type ModeFilter = 'any' | 'learn' | 'teach';
export type GenderFilter = 'any' | 'male' | 'female';

export interface FiltersState {
  type: ModeFilter;
  skillIds: string[];
  gender: GenderFilter;
  cityIds: string[];
}

export interface TFiltersProps {
  categories: Array<{
    id: string;
    name: string;
    subCategories: Array<{
      id: string;
      name: string;
    }>;
  }>;
  cities: Array<{ location: string; id: string }>;
  filters: FiltersState;
  onFiltersChange: (filters: FiltersState) => void;
  onResetFilters: () => void;
}

const Filters = memo(function Filters({
  categories,
  cities,
  filters,
  onFiltersChange,
  onResetFilters
}: TFiltersProps) {
  // Обработчики для каждого типа фильтра
  const handleTypeChange = (type: ModeFilter): void => {
    onFiltersChange({ ...filters, type });
  };

  const handleSkillsChange = (skillIds: string[]): void => {
    onFiltersChange({ ...filters, skillIds });
  };

  const handleGenderChange = (gender: GenderFilter) => {
    onFiltersChange({ ...filters, gender });
  };

  const handleCitiesChange = (cityIds: string[]) => {
    onFiltersChange({ ...filters, cityIds });
  };

  // Функция для сброса всех фильтров
  const handleResetFilters = () => {
    onResetFilters();
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.type !== 'any') count++;
    if (filters.gender !== 'any') count++;
    count += filters.skillIds.length;
    count += filters.cityIds.length;
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
          selectedSkillIds={filters.skillIds}
          onChange={handleSkillsChange}
        />
        <GenderFilter value={filters.gender} onChange={handleGenderChange} />
        <CitiesFilter
          cities={cities}
          selectedCityIds={filters.cityIds}
          onChange={handleCitiesChange}
        />
      </div>
    </aside>
  );
});

export default Filters;
