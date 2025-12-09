import { citiesHandlers } from './cities.ts';
import { categoriesHandlers } from './catigories.ts';
import { skillsHandlers } from './skills.ts';
import { usersHandlers } from './users.ts';
import { authHandlers } from './auth.ts';

export const handlers = [
  ...citiesHandlers,
  ...categoriesHandlers,
  ...skillsHandlers,
  ...usersHandlers,
  ...authHandlers
];
