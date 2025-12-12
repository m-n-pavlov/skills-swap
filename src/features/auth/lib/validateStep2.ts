export const NAME_ERROR_TEXT = 'Введите имя';
export const DATE_ERROR_TEXT = 'Введите дату рождения';
export const GENDER_ERROR_TEXT = 'Выберите ваш пол';
export const CITY_ERROR_TEXT = 'Выберите город';
export const CATEGORY_ERROR_TEXT = 'Выберите категорию';
export const SUBCATEGORY_ERROR_TEXT = 'Выберите подкатегорию';
export const AVATAR_ERROR_TEXT = 'Загрузите аватар';

export const validateName = (value: string): string | null => {
  const trimmed = value.trim();
  return trimmed ? null : NAME_ERROR_TEXT;
};

export const validateDate = (value: string): string | null => {
  const trimmed = value.trim();
  return trimmed ? null : DATE_ERROR_TEXT;
};

export const validateGender = (value: string): string | null => {
  return value ? null : GENDER_ERROR_TEXT;
};

export const validateCity = (value: string): string | null => {
  return value ? null : CITY_ERROR_TEXT;
};

export const validateCategory = (value: string): string | null => {
  return value ? null : CATEGORY_ERROR_TEXT;
};

export const validateSubCategory = (value: string): string | null => {
  return value ? null : SUBCATEGORY_ERROR_TEXT;
};

export const validateAvatar = (value: File | null): string | null => {
  return value ? null : AVATAR_ERROR_TEXT;
};
