export interface CheckboxProps {
  skills: string[]; // плоский список
  selectedSkills: string[]; // какие отмечены
  expandedSkills?: string[]; // какие раскрыты (опционально)
  expandableSkills?: string[]; // какие могут раскрываться (речь о категории)
  isOpen?: boolean;
  onChange: (skill: string) => void;
  onToggleExpand?: (skill: string) => void; // опционально
  legend?: string;
}
