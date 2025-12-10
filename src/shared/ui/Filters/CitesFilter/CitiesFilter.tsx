import { Checkbox } from '../../Checkbox';
import styles from './CityFilter.module.css';
import { useRef, useState } from 'react';
import { clsx } from 'clsx';
import { ArrowToggleButton } from '../../ArrowToggleButton';
interface CityFilterProps {
  cities: Array<{ location: string; id: string }>;
  selectedCities: string[];
  onChange: (cities: string[]) => void;
}

const CityFilter = ({ cities, selectedCities, onChange }: CityFilterProps) => {
  const [showAllCities, setShowAllCities] = useState(false);
  const allCities = cities.map((item) => item.location);
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

  const handleCityChange = (city: string) => {
    const newCities = selectedCities.includes(city)
      ? selectedCities.filter((c) => c !== city)
      : [...selectedCities, city];
    onChange(newCities);
  };

  return (
    <div>
      <h4 className={styles.title}>Город</h4>
      <div
        className={clsx(styles.cities, showAllCities && styles.allCites)}
        ref={citiesRef}
      >
        <Checkbox
          skills={allCities}
          selectedSkills={selectedCities}
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

export default CityFilter;
