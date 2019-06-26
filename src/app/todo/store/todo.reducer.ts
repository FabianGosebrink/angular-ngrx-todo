import { Todo } from '../../models/todo';
import * as todoActions from './todo.actions';
import { createReducer, on, Action } from '@ngrx/store';

export interface ReducerTodoState {
  items: Todo[];
  selectedItem: Todo;
  loading: boolean;
}

export const initialState: ReducerTodoState = {
  items: [],
  selectedItem: null,
  loading: false
};

const todoReducerInternal = createReducer(
  initialState,
  on(
    todoActions.addTodo,
    todoActions.deleteTodo,
    todoActions.loadAllTodos,
    todoActions.loadSingleTodo,
    todoActions.setAsDone,
    state => ({
      ...state,
      loading: true
    })
  ),
  on(todoActions.addTodoFinished, (state, { payload }) => ({
    ...state,
    loading: false,
    items: [...state.items, payload]
  })),
  on(todoActions.loadAllTodosFinished, (state, { payload }) => ({
    ...state,
    loading: false,
    items: [...payload]
  })),
  on(todoActions.loadSingleTodoFinished, (state, { payload }) => ({
    ...state,
    loading: false,
    selectedItem: payload
  })),
  on(todoActions.deleteTodoFinished, (state, { payload }) => ({
    ...state,
    loading: false,
    items: [...state.items.filter(x => x !== payload)]
  })),
  on(todoActions.setAsDoneFinished, (state, { payload }) => {
    const index = state.items.findIndex(x => x.id === payload.id);

    state.items[index] = payload;

    return {
      ...state
    };
  })
);

export function todoReducer(
  state: ReducerTodoState | undefined,
  action: Action
) {
  return todoReducerInternal(state, action);
}
