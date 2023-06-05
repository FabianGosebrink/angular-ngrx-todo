import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { TodoActions } from './todo.actions';
import { TodoService } from './todo.service';

@Injectable()
export class TodoEffects {
  constructor(private actions$: Actions, private todoService: TodoService) {}

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.loadAllTodos),
      concatMap(() =>
        this.todoService.getItems().pipe(
          map((todos) => TodoActions.loadAllTodosFinished({ todos })),
          catchError((error) => of(error))
        )
      )
    )
  );

  addTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.addTodo),
      concatMap(({ value }) =>
        this.todoService.addItem(value).pipe(
          map((todo) => TodoActions.addTodoFinished({ todo })),
          catchError((error) => of(error))
        )
      )
    )
  );

  markAsDone$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.setAsDone),
      concatMap(({ todo }) => {
        const toSend = { ...todo, done: !todo.done };
        return this.todoService.updateItem(toSend).pipe(
          map((todo) => TodoActions.setAsDoneFinished({ todo })),
          catchError((error) => of(error))
        );
      })
    )
  );

  deleteTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.deleteTodo),
      concatMap(({ todo }) =>
        this.todoService.deleteItem(todo).pipe(
          map((_) => TodoActions.deleteTodoFinished({ todo })),
          catchError((error) => of(error))
        )
      )
    )
  );
}
