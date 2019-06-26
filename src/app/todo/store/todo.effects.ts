import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as todoActions from './todo.actions';
import { TodoService } from '@app/core/services/todo.service';

@Injectable()
export class TodoEffects {
  constructor(private actions$: Actions, private todoService: TodoService) {}

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActions.loadAllTodos),
      switchMap(action =>
        this.todoService.getItems().pipe(
          map(todos => todoActions.loadAllTodosFinished({ payload: todos })),
          catchError(error => of(error))
        )
      )
    )
  );

  loadSingleTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActions.loadSingleTodo),
      map(action => action.payload),
      switchMap(payload =>
        this.todoService.getItem(payload).pipe(
          map(todo => todoActions.loadSingleTodoFinished({ payload: todo })),
          catchError(error => of(error))
        )
      )
    )
  );

  addTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActions.addTodo),
      map(action => action.payload),
      switchMap(payload =>
        this.todoService.addItem(payload).pipe(
          map(todo => todoActions.addTodoFinished({ payload: todo })),
          catchError(error => of(error))
        )
      )
    )
  );

  markAsDone$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActions.setAsDone),
      map(action => action.payload),
      switchMap(payload =>
        this.todoService.updateItem(payload).pipe(
          map(todo => todoActions.setAsDoneFinished({ payload: todo })),
          catchError(error => of(error))
        )
      )
    )
  );

  deleteTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActions.deleteTodo),
      map(action => action.payload),
      switchMap(payload =>
        this.todoService.deleteItem(payload).pipe(
          map(_ => todoActions.deleteTodoFinished({ payload })),
          catchError(error => of(error))
        )
      )
    )
  );
}
