import { Todo } from '../../models/todo';
import { ActionTypes, TodoActions } from './todo.actions';

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

export function todoReducer(
  state = initialState,
  action: TodoActions
): ReducerTodoState {
  switch (action.type) {
    case ActionTypes.AddTodo:
    case ActionTypes.DeleteTodo:
    case ActionTypes.LoadAllTodos:
    case ActionTypes.LoadSingleTodo:
    case ActionTypes.SetAsDone: {
      return {
        ...state,
        loading: true
      };
    }

    case ActionTypes.AddTodoFinished: {
      return {
        ...state,
        loading: false,
        items: [...state.items, action.payload]
      };
    }

    case ActionTypes.LoadAllTodosFinished: {
      return {
        ...state,
        loading: false,
        items: [...action.payload]
      };
    }

    case ActionTypes.LoadSingleTodoFinished: {
      return {
        ...state,
        loading: false,
        selectedItem: action.payload
      };
    }

    case ActionTypes.DeleteTodoFinished: {
      return {
        ...state,
        loading: false,
        items: [...state.items.filter(x => x !== action.payload)]
      };
    }

    case ActionTypes.SetAsDoneFinished: {
      const index = state.items.findIndex(x => x.id === action.payload.id);

      state.items[index] = action.payload;

      return {
        ...state
      };
    }

    default:
      return state;
  }
}
