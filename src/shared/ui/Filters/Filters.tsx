import SkillsFilter from './SkillsFilter/SkillsFilter.tsx';
import CitiesFilter from './CitiesFilter/CitiesFilter.tsx';
import TypeFilter from './TypeFilter/TypeFilter.tsx';
import GenderFilter from './GenderFilter/GenderFilter.tsx';
import styles from './Filters.module.css';
import { memo, useEffect, useState } from 'react';
import { Icon } from '../Icon';

// Типы для фильтров (если их нет в отдельном файле, создаем здесь)
export type ModeFilter = 'any' | 'learn' | 'teach';
export type TGenderFilter = 'any' | 'male' | 'female';

export interface FiltersState {
  type: ModeFilter;
  skillIds: string[]; // id выбранных подкатегорий
  gender: TGenderFilter;
  cityIds: string[]; // id выбранных городов
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
  onFiltersChange?: (filters: FiltersState) => void;
}

const Filters = ({ categories, cities, onFiltersChange }: TFiltersProps) => {
  const [filters, setFilters] = useState<FiltersState>({
    type: 'any', // Изменено с 'all' на 'any' для согласованности с TypeFilter
    skillIds: [], // переименовано с skills на skillIds
    gender: 'any',
    cityIds: [] // переименовано с cities на cityIds
  });

  // Обработчики для каждого типа фильтра
  const handleTypeChange = (type: ModeFilter): void => {
    setFilters((prev) => ({ ...prev, type }));
  };

  const handleSkillsChange = (skillIds: string[]): void => {
    setFilters((prev) => ({ ...prev, skillIds }));
  };

  const handleGenderChange = (gender: TGenderFilter) => {
    setFilters((prev) => ({ ...prev, gender }));
  };

  const handleCitiesChange = (cityIds: string[]) => {
    setFilters((prev) => ({ ...prev, cityIds }));
  };

  // Функция для сброса всех фильтров
  const handleResetFilters = () => {
    setFilters({
      type: 'any',
      skillIds: [],
      gender: 'any',
      cityIds: []
    });
  };

  // Передаём фильтры наверх
  useEffect(() => {
    onFiltersChange?.(filters);
  }, [filters]);

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
};

export default memo(Filters);
