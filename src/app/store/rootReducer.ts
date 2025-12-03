import { combineReducers } from '@reduxjs/toolkit';
import categoriesReducer from './slices/categoriesSlice';

export const rootReducer = combineReducers({
  categories: categoriesReducer
});
