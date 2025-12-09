import { useState } from 'react';
import { Checkbox } from '../../Checkbox';

interface CheckboxGroupProps {
  category: {
    name: string;
    subCategories: Array<{ name: string }>;
  };
  selectedSkills: string[];
  onSkillChange: (skill: string) => void;
  onCategoryChange: (categorySkills: string[]) => void;
}

const CheckboxGroup = ({
  category,
  selectedSkills,
  onSkillChange,
  onCategoryChange
}: CheckboxGroupProps) => {
  const [expanded, setExpanded] = useState<string[]>([]);

  const subCategories = category.subCategories.map((item) => item.name);

  // Проверяем, выбрана ли хотя бы одна подкатегория
  const someSubSkillsSelected = subCategories.some((skill) =>
    selectedSkills.includes(skill)
  );

  const handleExpand = (skill: string) => {
    setExpanded((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleCategoryIconClick = () => {
    onCategoryChange(subCategories);
  };

  return (
    <div>
      <Checkbox
        skills={[category.name]}
        selectedSkills={someSubSkillsSelected ? [category.name] : []}
        expandedSkills={expanded}
        expandableSkills={[category.name]}
        onChange={handleCategoryIconClick}
        onToggleExpand={handleExpand}
        isOpen={true}
      />

      {expanded.includes(category.name) && (
        <div style={{ marginLeft: '32px', marginTop: '8px' }}>
          <Checkbox
            skills={subCategories}
            selectedSkills={selectedSkills.filter((skill) =>
              subCategories.includes(skill)
            )}
            onChange={onSkillChange}
            isOpen={true}
          />
        </div>
      )}
    </div>
  );
};

export default CheckboxGroup;
