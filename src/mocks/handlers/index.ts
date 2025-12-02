import { citiesHandlers } from './cities.ts';
import { categoriesHandlers } from './catigories.ts';

export const handlers = [...citiesHandlers, ...categoriesHandlers];
