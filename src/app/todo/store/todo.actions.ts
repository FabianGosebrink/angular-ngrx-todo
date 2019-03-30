import { Action } from '@ngrx/store';
import { Todo } from '../../models/todo';

export enum ActionTypes {
  LoadAllTodos = '[Todo] Load Todos',
  LoadAllTodosFinished = '[Todo] Load Todos Finished',

  LoadSingleTodo = '[Todo] Load Single Todos',
  LoadSingleTodoFinished = '[Todo] Load Single Todo Finished',

  AddTodo = '[Todo] Add Todo',
  AddTodoFinished = '[Todo] Add Todo Finished',

  SetAsDone = '[Todo] SetAsDone',
  SetAsDoneFinished = '[Todo] SetAsDone Finished',
}

export class LoadAllTodosAction implements Action {
  readonly type = ActionTypes.LoadAllTodos;
}

export class LoadAllTodosFinishedAction implements Action {
  readonly type = ActionTypes.LoadAllTodosFinished;
  constructor(public payload: Todo[]) {}
}

export class LoadSingleTodoAction implements Action {
  readonly type = ActionTypes.LoadSingleTodo;
  constructor(public payload: string) {}
}

export class LoadSingleTodoFinishedAction implements Action {
  readonly type = ActionTypes.LoadSingleTodoFinished;
  constructor(public payload: Todo) {}
}

export class AddTodoAction implements Action {
  readonly type = ActionTypes.AddTodo;
  constructor(public payload: string) {}
}

export class AddTodoFinishedAction implements Action {
  readonly type = ActionTypes.AddTodoFinished;
  constructor(public payload: Todo) {}
}

export class SetAsDoneAction implements Action {
  readonly type = ActionTypes.SetAsDone;
  constructor(public payload: Todo) {}
}

export class SetAsDoneFinishedAction implements Action {
  readonly type = ActionTypes.SetAsDoneFinished;
  constructor(public payload: Todo) {}
}

export type TodoActions =
  | AddTodoAction
  | SetAsDoneAction
  | AddTodoFinishedAction
  | SetAsDoneFinishedAction
  | LoadAllTodosAction
  | LoadAllTodosFinishedAction
  | LoadSingleTodoFinishedAction
  | LoadSingleTodoFinishedAction;
