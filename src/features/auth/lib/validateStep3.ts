// Тексты ошибок для шага 3
export const SKILL_NAME_ERROR_TEXT = 'Введите название навыка';
export const SKILL_CATEGORY_ERROR_TEXT = 'Выберите категорию навыка';
export const SKILL_SUBCATEGORY_ERROR_TEXT = 'Выберите подкатегорию навыка';
export const SKILL_DESCRIPTION_ERROR_TEXT =
  'Введите описание навыка (минимум 10 символов)';
export const SKILL_IMAGES_ERROR_TEXT = 'Добавьте хотя бы одно изображение';

// ---- ВАЛИДАЦИЯ ПОЛЕЙ ШАГА 3 ----

export const validateSkillName = (value: string): string | null => {
  const trimmed = value.trim();
  return trimmed ? null : SKILL_NAME_ERROR_TEXT;
};

export const validateSkillCategory = (value: string): string | null => {
  return value ? null : SKILL_CATEGORY_ERROR_TEXT;
};

export const validateSkillSubCategory = (value: string): string | null => {
  return value ? null : SKILL_SUBCATEGORY_ERROR_TEXT;
};

export const validateSkillDescription = (value: string): string | null => {
  const trimmed = value.trim();

  if (!trimmed) {
    return SKILL_DESCRIPTION_ERROR_TEXT;
  }

  return null;
};

export const validateSkillImages = (images: File[]): string | null => {
  if (!images || images.length === 0) {
    return SKILL_IMAGES_ERROR_TEXT;
  }

  return null;
};
