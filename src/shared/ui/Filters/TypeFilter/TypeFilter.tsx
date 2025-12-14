import type { RadioButtonItem } from '../../RadioButton/type.ts';
import { RadioButton } from '../../RadioButton';
import type { ModeFilter } from '../../../../app/store/slices/filtersSlice/filtersSlice.ts';

interface TypeFilterProps {
  value: ModeFilter;
  onChange: (value: ModeFilter) => void;
}

const TypeFilter = ({ value, onChange }: TypeFilterProps) => {
  const types: RadioButtonItem<ModeFilter>[] = [
    {
      label: 'Всё',
      value: 'any',
      checked: value === 'any'
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

  const handleChange = (selectedValue: ModeFilter) => {
    onChange(selectedValue);
  };

  return (
    <RadioButton name='Фильтр по типам' items={types} onChange={handleChange} />
  );
};

export default TypeFilter;
