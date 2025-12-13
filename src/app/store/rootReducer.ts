import { combineReducers } from '@reduxjs/toolkit';
import categoriesReducer from './slices/categoriesSlice/categoriesSlice.ts';
import citiesReducer from './slices/citiesSlice/citiesSlice.ts';
import usersReducer from './slices/usersSlice/userSlice.ts';
import skillsReducer from './slices/skillsSlice/skillsSlice.ts';
import { registrationReducer } from './slices/registration/registrationSlice.ts';
import authReducer from './slices/authSlice/authSlice.ts';
import filtersReducer from './slices/filtersSlice/filtersSlice';

export const rootReducer = combineReducers({
  categories: categoriesReducer,
  cities: citiesReducer,
  users: usersReducer,
  skills: skillsReducer,
  registration: registrationReducer,
  filters: filtersReducer,
  auth: authReducer
});
