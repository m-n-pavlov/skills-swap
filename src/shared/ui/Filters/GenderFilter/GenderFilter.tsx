import type { RadioButtonItem } from '../../RadioButton/type.ts';
import { RadioButton } from '../../RadioButton';
import styles from './GenderFilter.module.css';
import type { GenderFilter as GenderFilterType } from '../../../../app/store/slices/filtersSlice/filtersSlice.ts';

interface GenderFilterProps {
  value: GenderFilterType;
  onChange: (value: GenderFilterType) => void;
}

const GenderFilter = ({ value, onChange }: GenderFilterProps) => {
  const genders: RadioButtonItem<GenderFilterType>[] = [
    {
      label: 'Не имеет значения',
      value: 'any',
      checked: value === 'any'
    },
    {
      label: 'Мужской',
      value: 'male',
      checked: value === 'male'
    },
    {
      label: 'Женский',
      value: 'female',
      checked: value === 'female'
    }
  ];

  const handleChange = (selectedValue: GenderFilterType) => {
    onChange(selectedValue);
  };

  return (
    <div>
      <h4 className={styles.title}>Пол Автора</h4>
      <RadioButton
        name='Фильтр по полу'
        items={genders}
        onChange={handleChange}
      />
    </div>
  );
};

export default GenderFilter;
