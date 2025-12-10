export type TSkill = {
  id: string; // простые числа
  name: string; // название навыка
  shortDescription: string; // короткое описание
  description: string; // полное описание
  categoryId: string; // связь с категорией
  subcategoryId: string; // связь с подкатегорией
  images: string[]; // пути до изображений
};
