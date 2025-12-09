import { combineReducers } from '@reduxjs/toolkit';
import categoriesReducer from './slices/categoriesSlice/categoriesSlice.ts';
import citiesReducer from './slices/citiesSclice/citiesSlice.ts';

export const rootReducer = combineReducers({
  categories: categoriesReducer,
  cities: citiesReducer
});
