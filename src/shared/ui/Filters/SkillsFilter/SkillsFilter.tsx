import CheckboxGroup from '../CheckboxGroup/CheckboxGroup.tsx';
import styles from './SkillsFilter.module.css';

interface SkillsFilterProps {
  categories: Array<{
    name: string;
    subCategories: Array<{ name: string }>;
  }>;
  selectedSkills: string[];
  onChange: (skills: string[]) => void;
}

const SkillsFilter = ({
  categories,
  selectedSkills,
  onChange
}: SkillsFilterProps) => {
  const handleSkillChange = (skill: string) => {
    const newSkills = selectedSkills.includes(skill)
      ? selectedSkills.filter((s) => s !== skill)
      : [...selectedSkills, skill];
    onChange(newSkills);
  };

  const handleCategoryChange = (categorySkills: string[]) => {
    // Удаляем все навыки категории, которые есть в selectedSkills
    const filteredSkills = selectedSkills.filter(
      (skill) => !categorySkills.includes(skill)
    );

    // Если все навыки категории были выбраны - удаляем их, иначе добавляем
    const allSelected = categorySkills.every((skill) =>
      selectedSkills.includes(skill)
    );

    const newSkills = allSelected
      ? filteredSkills
      : [...filteredSkills, ...categorySkills];

    onChange(newSkills);
  };

  return (
    <div>
      <h4 className={styles.title}>Навыки</h4>
      {categories.map((category) => (
        <CheckboxGroup
          key={category.name}
          category={category}
          selectedSkills={selectedSkills}
          onSkillChange={handleSkillChange}
          onCategoryChange={handleCategoryChange}
        />
      ))}
    </div>
  );
};

export default SkillsFilter;
