import { Todo } from '../../models/todo';
import { ActionTypes, TodoActions } from './todo.actions';

export interface ReducerTodoState {
  items: Todo[];
  selectedItem: Todo;
}

export const initialState: ReducerTodoState = {
  items: [],
  selectedItem: null,
};

export function todoReducer(
  state = initialState,
  action: TodoActions
): ReducerTodoState {
  switch (action.type) {
    case ActionTypes.AddTodoFinished: {
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    }

    case ActionTypes.LoadAllTodosFinished: {
      return {
        ...state,
        items: [...action.payload],
      };
    }

    case ActionTypes.LoadSingleTodoFinished: {
      return {
        ...state,
        selectedItem: action.payload,
      };
    }

    case ActionTypes.SetAsDoneFinished: {
      const index = state.items.findIndex(x => x.id === action.payload.id);

      state.items[index] = action.payload;

      return {
        ...state,
      };
    }

    default:
      return state;
  }
}
