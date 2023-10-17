import { createReducer, on } from '@ngrx/store';
import { Todo } from '../models/todo';
import { TodoActions } from './todo.actions';

export interface TodoState {
  items: Todo[];
  selectedItem: Todo;
  loading: boolean;
}

export const initialState: TodoState = {
  items: [],
  selectedItem: null,
  loading: false,
};

export const todoReducer = createReducer(
  initialState,
  on(TodoActions.addTodo, TodoActions.loadAllTodos, (state) => ({
    ...state,
    loading: true,
  })),

  on(TodoActions.addTodoFinished, (state, { todo }) => {
    const newItems = [...state.items, todo];
    const sortedItems = newItems.sort(sortByDone());

    return {
      ...state,
      loading: false,
      items: sortedItems,
    };
  }),

  on(TodoActions.loadAllTodosFinished, (state, { todos }) => {
    const sortedItems = todos.sort(sortByDone());

    return {
      ...state,
      loading: false,
      items: [...sortedItems],
    };
  }),

  on(TodoActions.deleteTodoFinished, (state, { todo }) => ({
    ...state,
    loading: false,
    items: [...state.items.filter((x) => x.id !== todo.id)],
  })),

  on(TodoActions.setAsDoneFinished, (state, { todo }) => {
    const allItems = [...state.items];
    const index = allItems.findIndex((x) => x.id === todo.id);

    allItems[index] = todo;

    return {
      ...state,
      loading: false,
      items: allItems,
    };
  })
);

function sortByDone(): (a: Todo, b: Todo) => number {
  return (a: Todo, b: Todo) => {
    if (a.done < b.done) {
      return -1;
    }
    if (a.done > b.done) {
      return 1;
    }
    return 0;
  };
}
