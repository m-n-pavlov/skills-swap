import { combineReducers } from '@reduxjs/toolkit';
import categoriesReducer from './slices/categoriesSlice/categoriesSlice.ts';
import citiesReducer from './slices/citiesSlice/citiesSlice.ts';
import usersReducer from './slices/usersSlice/userSlice.ts';
import skillsReducer from './slices/skillsSlice/skillsSlice.ts';

export const rootReducer = combineReducers({
  categories: categoriesReducer,
  cities: citiesReducer,
  users: usersReducer,
  skills: skillsReducer
});
