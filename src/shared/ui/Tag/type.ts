export type TagCategory =
  | 'business'
  | 'language'
  | 'home'
  | 'art'
  | 'education'
  | 'health'
  | 'default';

export type TagProps = {
  children: string;
  category?: TagCategory;
  className?: string;
};
