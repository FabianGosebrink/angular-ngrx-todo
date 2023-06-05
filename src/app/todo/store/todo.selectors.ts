import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodoState } from './todo.reducer';

export const featureName = 'todoFeature';

export const getTodoFeatureState =
  createFeatureSelector<TodoState>(featureName);

export const getAllItems = createSelector(
  getTodoFeatureState,
  (state: TodoState) => state.items
);
