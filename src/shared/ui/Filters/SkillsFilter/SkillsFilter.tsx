import CheckboxGroup from '../CheckboxGroup/CheckboxGroup.tsx';
import styles from './SkillsFilter.module.css';
import type { TCategory } from '../../../../entities/categories.ts';

interface SkillsFilterProps {
  categories: TCategory[];
  selectedSkillIds: string[];
  onChange: (skillIds: string[]) => void;
}

const SkillsFilter = ({
  categories,
  selectedSkillIds,
  onChange
}: SkillsFilterProps) => {
  const handleSkillChange = (skillId: string) => {
    const newSkillIds = selectedSkillIds.includes(skillId)
      ? selectedSkillIds.filter((id) => id !== skillId)
      : [...selectedSkillIds, skillId];
    onChange(newSkillIds);
  };

  const handleCategoryChange = (categorySkillIds: string[]) => {
    const filteredSkillIds = selectedSkillIds.filter(
      (id) => !categorySkillIds.includes(id)
    );

    const allSelected = categorySkillIds.every((id) =>
      selectedSkillIds.includes(id)
    );

    const newSkillIds = allSelected
      ? filteredSkillIds
      : [...filteredSkillIds, ...categorySkillIds];

    onChange(newSkillIds);
  };

  return (
    <div>
      <h4 className={styles.title}>Навыки</h4>
      {categories.map((category) => (
        <CheckboxGroup
          key={category.id}
          category={category}
          selectedSubCategoryIds={selectedSkillIds}
          onSkillChange={handleSkillChange}
          onCategoryChange={handleCategoryChange}
        />
      ))}
    </div>
  );
};

export default SkillsFilter;
