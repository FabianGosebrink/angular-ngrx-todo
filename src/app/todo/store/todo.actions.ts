import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Todo } from '../models/todo';

export const TodoActions = createActionGroup({
  source: 'Todo',
  events: {
    'Add Todo': props<{ value: string }>(),
    'Add Todo Finished': props<{ todo: Todo }>(),

    'Load All Todos': emptyProps(),
    'Load All Todos Finished': props<{ todos: Todo[] }>(),

    'Set As Done': props<{ todo: Todo }>(),
    'Set As Done Finished': props<{ todo: Todo }>(),

    'Delete Todo': props<{ todo: Todo }>(),
    'Delete Todo Finished': props<{ todo: Todo }>(),
  },
});
