import { Checkbox } from '../../Checkbox';
import styles from './CityFilter.module.css';
import { useRef, useState } from 'react';
import { clsx } from 'clsx';
import { ArrowToggleButton } from '../../ArrowToggleButton';

interface CityFilterProps {
  cities: Array<{ location: string; id: string }>;
  selectedCityIds: string[];
  onChange: (cityIds: string[]) => void;
}

const CitiesFilter = ({
  cities,
  selectedCityIds,
  onChange
}: CityFilterProps) => {
  const [showAllCities, setShowAllCities] = useState(false);
  const citiesRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    if (showAllCities) {
      // Скроллим контейнер городов вверх
      citiesRef.current?.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
    setShowAllCities(!showAllCities);
  };

  const handleCityChange = (cityId: string) => {
    const newCityIds = selectedCityIds.includes(cityId)
      ? selectedCityIds.filter((id) => id !== cityId)
      : [...selectedCityIds, cityId];
    onChange(newCityIds);
  };

  // Преобразуем города в формат CheckboxItem
  const cityItems = cities.map((city) => ({
    id: city.id,
    label: city.location
  }));

  return (
    <div>
      <h4 className={styles.title}>Город</h4>
      <div
        className={clsx(styles.cities, showAllCities && styles.allCites)}
        ref={citiesRef}
      >
        <Checkbox
          items={cityItems}
          selectedIds={selectedCityIds}
          onChange={handleCityChange}
        />
      </div>
      <ArrowToggleButton
        label={showAllCities ? 'Свернуть' : 'Все города'}
        onClick={handleToggle}
        isOpen={showAllCities}
        className={styles.button}
      />
    </div>
  );
};

export default CitiesFilter;
