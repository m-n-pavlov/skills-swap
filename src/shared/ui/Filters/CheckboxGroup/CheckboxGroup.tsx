import { useState } from 'react';
import { Checkbox } from '../../Checkbox';

interface CheckboxGroupProps {
  category: {
    id: string;
    name: string;
    subCategories: Array<{
      id: string;
      name: string;
    }>;
  };
  selectedSubCategoryIds: string[];
  onSkillChange: (subCategoryId: string) => void;
  onCategoryChange: (subCategoryIds: string[]) => void;
}

const CheckboxGroup = ({
  category,
  selectedSubCategoryIds,
  onSkillChange,
  onCategoryChange
}: CheckboxGroupProps) => {
  const [expanded, setExpanded] = useState<string[]>([]);

  const subCategoryIds = category.subCategories.map((item) => item.id);

  const someSubSkillsSelected = subCategoryIds.some((id) =>
    selectedSubCategoryIds.includes(id)
  );

  const handleExpand = (id: string) => {
    setExpanded((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleCategoryIconClick = () => {
    onCategoryChange(subCategoryIds);
  };

  return (
    <div>
      <Checkbox
        items={[{ id: category.id, label: category.name }]}
        selectedIds={someSubSkillsSelected ? [category.id] : []}
        expandedIds={expanded}
        expandableIds={[category.id]}
        onChange={handleCategoryIconClick}
        onToggleExpand={handleExpand}
        isOpen={true}
      />

      {expanded.includes(category.id) && (
        <div style={{ marginLeft: '32px', marginTop: '8px' }}>
          <Checkbox
            items={category.subCategories.map((sub) => ({
              id: sub.id,
              label: sub.name
            }))}
            selectedIds={selectedSubCategoryIds.filter((id) =>
              subCategoryIds.includes(id)
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
