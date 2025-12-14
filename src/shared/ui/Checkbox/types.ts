export interface CheckboxItem {
  id: string;
  label: string;
}

export interface CheckboxProps {
  items: CheckboxItem[];
  selectedIds: string[];
  expandedIds?: string[];
  expandableIds?: string[];
  isOpen?: boolean;
  onChange: (id: string) => void;
  onToggleExpand?: (id: string) => void;
  legend?: string;
}
