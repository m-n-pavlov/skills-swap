export interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
  disabled: boolean;
  count?: number;
}
