import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { ReducerTodoState, todoReducer } from './todo.reducer';

export const featureStateName = 'todoFeature';

export interface TodoState {
  todo: ReducerTodoState;
}

export const todoReducers: ActionReducerMap<TodoState> = {
  todo: todoReducer,
};

export const getTodoFeatureState = createFeatureSelector<TodoState>(
  featureStateName
);

export const getAllUndoneItems = createSelector(
  getTodoFeatureState,
  (state: TodoState) => state.todo.items.filter(x => !x.done)
);

export const getAllDoneItems = createSelector(
  getTodoFeatureState,
  (state: TodoState) => state.todo.items.filter(x => x.done)
);

export const getSelectedItem = createSelector(
  getTodoFeatureState,
  (state: TodoState) => state.todo.selectedItem
);
