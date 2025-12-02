export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  name: string;
  placeholder: string;
  type?: 'text' | 'search';
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  onClear?: () => void;
  showClearButton?: boolean;
}
