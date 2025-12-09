import { RadioButton } from '../../RadioButton';
import type { RadioButtonItem } from '../../RadioButton/type.ts';

interface TypeFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const TypeFilter = ({ value, onChange }: TypeFilterProps) => {
  const types: RadioButtonItem[] = [
    {
      label: 'Всё',
      value: 'all',
      checked: value === 'all' || value === ''
    },
    {
      label: 'Хочу научиться',
      value: 'learn',
      checked: value === 'learn'
    },
    {
      label: 'Могу научить',
      value: 'teach',
      checked: value === 'teach'
    }
  ];

  const handleChange = (selectedValue: string) => {
    onChange(selectedValue);
  };

  return (
    <RadioButton
      name={'Фильтр по типам'}
      items={types}
      onChange={handleChange}
    />
  );
};

export default TypeFilter;
