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

  // Получаем массив id подкатегорий
  const subCategoryIds = category.subCategories.map((item) => item.id);

  // Проверяем, выбрана ли хотя бы одна подкатегория
  const someSubSkillsSelected = subCategoryIds.some((id) =>
    selectedSubCategoryIds.includes(id)
  );

  const handleExpand = (id: string) => {
    setExpanded((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleCategoryIconClick = () => {
    // Передаем массив id всех подкатегорий этой категории
    onCategoryChange(subCategoryIds);
  };

  return (
    <div>
      {/* Чекбокс категории - используем новый API */}
      <Checkbox
        items={[{ id: category.id, label: category.name }]}
        selectedIds={someSubSkillsSelected ? [category.id] : []}
        expandedIds={expanded}
        expandableIds={[category.id]}
        onChange={handleCategoryIconClick}
        onToggleExpand={handleExpand}
        isOpen={true}
      />

      {/* Подкатегории - используем новый API */}
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
