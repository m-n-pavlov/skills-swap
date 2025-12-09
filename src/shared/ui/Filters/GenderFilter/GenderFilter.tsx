import type { RadioButtonItem } from '../../RadioButton/type.ts';
import { RadioButton } from '../../RadioButton';
import styles from './GenderFilter.module.css';

interface GenderFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const GenderFilter = ({ value, onChange }: GenderFilterProps) => {
  const genders: RadioButtonItem[] = [
    {
      label: 'Не имеет значения',
      value: 'any',
      checked: value === 'any' || value === ''
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

  const handleChange = (selectedValue: string) => {
    onChange(selectedValue);
  };

  return (
    <div>
      <h4 className={styles.title}>Пол Автора</h4>
      <RadioButton
        name={'Фильтр по полу'}
        items={genders}
        onChange={handleChange}
      />
    </div>
  );
};

export default GenderFilter;
