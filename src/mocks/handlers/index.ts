import { citiesHandlers } from './cities.ts';
import { categoriesHandlers } from './catigories.ts';
import { skillsHandlers } from './skills.ts';

export const handlers = [
  ...citiesHandlers,
  ...categoriesHandlers,
  ...skillsHandlers
];
